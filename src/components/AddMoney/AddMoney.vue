<script lang="ts" setup>
import { Props } from './types';
import { useExpensesCategoriesStore } from '@/stores/expensesCategories';
import { addPayment } from '@/api/balance';
import { addExpense } from '@/api/expenses';
import moment from 'moment';
import DateFilter from '../reports/Filters/DateFilter.vue';

const props = defineProps<Props>()
const emit = defineEmits(['success'])
const valid = ref(false)
const dateOpiu = ref(new Date())
const dateDds = ref(new Date())
const category = ref<string>('')
const sum = ref<number>()

const expensesCategoriesStore = useExpensesCategoriesStore()

const rules = {
  isNumber: (value: string | number) => isNaN(Number(value)) ? 'Поле должно быть числом' : true,
  required: (value: string) => !!value || 'Обязательное поле'
}

const handleAdd = async () => {
  if (valid.value) {
    const formattedDateOpiu = moment(dateOpiu.value).format('YYYY-MM-DDTHH:mm:ss')
    const formattedDateDds = moment(dateDds.value).format('YYYY-MM-DDTHH:mm:ss')
    try {
      const response = props.type === 'payment' ?
        await addPayment({ dds_moment: formattedDateDds, opiu_moment: formattedDateOpiu, sum: Number(sum.value) }) :
        await addExpense({ category_id: category.value, dds_moment: formattedDateDds, opiu_moment: formattedDateOpiu, sum: Number(sum.value) })
      if (response.success) {
        emit('success')
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  if (props.type === 'expense') {
    expensesCategoriesStore.get()
  }
})
</script>

<template>
  <v-card class="overflow-visible">
    <v-card-title>
      {{ type === 'payment' ? 'Добавить доход' : 'Добавить расход' }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-label text="Дата для ОПиУ" />
        <DateFilter v-model="dateOpiu" class="mb-3" :range="false" />
        <v-label text="Дата для ДДС" />
        <DateFilter v-model="dateDds" class="mb-3" :range="false" />
        <v-select v-if="type === 'expense'" v-model="category" :rules="[rules.required]"
          :loading="expensesCategoriesStore.isLoading" label="Категория расходов" item-title="name" item-value="id"
          :items="expensesCategoriesStore.items" />
        <v-text-field v-model="sum" :rules="[rules.isNumber, rules.required]" prefix="₽" dirty label="Сумма" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn base-color="indigo-lighten-2" @click="closeDialog()">Отмена</v-btn>
      <v-btn base-color="indigo-lighten-2" @click="handleAdd" :disabled="!valid">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</template>
