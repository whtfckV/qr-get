<script lang="ts" setup>
import { useExpensesCategoriesStore } from '@/stores/expensesCategories';
import { ExpenseCategory } from '@/types/expenses';
// TODO Сделать добавление категории модалкой с выбором группы
// TODO сделать сделать редактирование группы
// TODO и добавление категории
// TODO и удаление категории

const expensesCategoriesStore = useExpensesCategoriesStore()
const selectedCategory = ref<string>();

const handleFocus = (focus: boolean, category: ExpenseCategory) => {
  if (focus) {
    selectedCategory.value = category.name
  } else {
    if (selectedCategory.value !== category.name) {
      if (category.id.startsWith('add')) {
        expensesCategoriesStore.add(category.id, category.name)
      } else {
        expensesCategoriesStore.updateExpenseCategory(category)
      }
    }
    selectedCategory.value = ''
  }
}

onMounted(() => {
  expensesCategoriesStore.get()
})
</script>

<template>
  <v-card>
    <v-list tag="ul" v-if="expensesCategoriesStore.expensesCategories.length"
      v-for="group in expensesCategoriesStore.expensesCategories" bg-color="indigo-lighten-2">
      <v-list-subheader>{{ group.name }}</v-list-subheader>
      <template v-for="category in group.items" :key="category.id">
        <v-list-item tag="li">
          <v-text-field density="compact" v-model="category.name" hide-details="auto" append-icon="mdi-delete"
            @update:focused="(focus: boolean) => handleFocus(focus, category)"
            @click:append="expensesCategoriesStore.del(category.id)" variant="outlined" />
        </v-list-item>
        <v-list-item tag="li">
          <v-btn block @click="() => {}">
            <v-icon icon="mdi-plus" />
          </v-btn>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
