<script lang="ts" setup>
import { useExpensesCategoriesStore } from '@/stores/expensesCategories';
import { ExpenseCategory } from '@/types/expenses';
import { Confirmation } from '../Confirmation';

const expensesCategoriesStore = useExpensesCategoriesStore()
const selectedCategory = ref<string>();
const dialogDelete = ref(false)

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

onUnmounted(() => {
  expensesCategoriesStore.items = expensesCategoriesStore.items.filter((category) => category.name !== '')
})
</script>

<template>
  <v-card class="pa-5">
    <v-card>
      <v-list tag="ul" v-if="expensesCategoriesStore.items.length" bg-color="indigo-lighten-2">
        <v-list-item tag="li" v-for="category in expensesCategoriesStore.items">
          <v-text-field density="compact" v-model="category.name" hide-details="auto"
            @update:focused="(focus: boolean) => handleFocus(focus, category)"
            @click:append="expensesCategoriesStore.del(category.id)" variant="outlined">
            <template #append>
              <Confirmation v-model="dialogDelete" title="Архивировать категорию?" :message="`Вы уверены что хотите архивировать категорию ${category.name}? \n
                Это действие нельзя будет отменить \n
                Вы больше не сможете выбрать ее при добавлении расхода`"
                confirm-text="Архивировать"
                @confirm="expensesCategoriesStore.del(category.id)">
                <template #activator="{ props }">
                  <v-btn color="red" variant="outline" v-bind="props" icon="mdi-delete" />
                </template>
              </Confirmation>
            </template>
          </v-text-field>
        </v-list-item>
        <v-list-item tag="li">
          <v-btn block @click="expensesCategoriesStore.create()">
            <v-icon icon="mdi-plus" />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-card>
</template>
