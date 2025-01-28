<script lang="ts" setup>
import { VDateInput } from 'vuetify/labs/VDateInput'
import { Props } from './types';
import { useExpensesGroupStore } from '@/stores/expensesGroup';
import { addPayment } from '@/api/balance';
import { addExpense } from '@/api/expenses';
import moment from 'moment';

const props = defineProps<Props>()
const emit = defineEmits(['success'])
const valid = ref(false)
const date = ref(new Date())
const category = ref<string>('')
const sum = ref<number>()

const expensesCategoriesStore = useExpensesGroupStore()

const rules = {
  isNumber: (value: string | number) => isNaN(Number(value)) ? 'Поле должно быть числом' : true,
  required: (value: string) => !!value || 'Обязательное поле'
}

const handleAdd = async () => {
  if (valid.value) {
    const formattedDate = moment(date.value).format('YYYY-MM-DD')
    try {
      const response = props.type === 'payment' ?
        await addPayment({ moment: formattedDate, sum: Number(sum.value) }) :
        await addExpense({ category_id: category.value, moment: formattedDate, sum: Number(sum.value) })
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
  <v-card>
    <v-card-title>
      {{ type === 'payment' ? 'Добавить доход' : 'Добавить расход' }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-date-input v-model="date" label="Дата платежа" prepend-icon="" prepend-inner-icon="$calendar"
          variant="outlined" />
        <v-select v-if="type === 'expense'" v-model="category" :rules="[rules.required]"
          :loading="expensesCategoriesStore.isLoading" label="Категория расходов" item-title="name" item-value="id"
          :items="expensesCategoriesStore.expensesCategories" />
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
