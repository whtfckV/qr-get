<script setup lang="ts">
import { useExpesesGroupStore } from '@/stores/expensesGroup';
import { Emits, Props } from './types';
import { useExpensesCategoriesStore } from '@/stores/expensesCategories';

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const expensesCategoriesStore = useExpensesCategoriesStore()
const groupsStore = useExpesesGroupStore()
const category = ref('')

const handleAdd = () => {
  groupsStore.addCategory(props.group.id, category.value)
  emit('close')
}

onMounted(() => {
  expensesCategoriesStore.get()
})

</script>

<template>
  <v-card>
    <v-form @submit.prevent="handleAdd">
      <v-card-title class="text-h5">
        Добавление категории в группу {{ group.name }}
      </v-card-title>
      <v-card-text>
        <v-select v-model="category" :loading="expensesCategoriesStore.isLoading" label="Выберите категорию"
          :items="expensesCategoriesStore.items" item-title="name" item-value="id" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="emit('close')">
          Отмена
        </v-btn>
        <v-btn type="submit" color="success" variant="text">
          Добавить
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
