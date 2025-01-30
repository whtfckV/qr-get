<script lang="ts" setup>
import { useExpensesCategoriesStore } from '@/stores/expensesCategories';
import Expense from './Expense/Expense.vue';

const expensesCategoriesStore = useExpensesCategoriesStore()

onMounted(() => {
  expensesCategoriesStore.get()
})

onUnmounted(() => {
  expensesCategoriesStore.items = expensesCategoriesStore.items.filter((category) => category.name !== '')
})
</script>

<template>
  <v-card class="pa-5">
    <v-card>
      <v-list tag="ul" v-if="expensesCategoriesStore.items.length" bg-color="indigo-lighten-2">
        <Expense v-for="category in expensesCategoriesStore.items" :key="category.id" :category="category"
          @add="expensesCategoriesStore.add" @update="expensesCategoriesStore.updateExpenseCategory"
          @archive="expensesCategoriesStore.del" />
        <v-list-item tag="li">
          <v-btn title="Добавить категорию" block @click="expensesCategoriesStore.create()">
            <v-icon icon="mdi-plus" />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-card>
</template>
