<script lang="ts" setup>
import { useExpensesGroupStore } from '@/stores/expensesGroup';
// import { ExpenseCategory } from '@/types/expenses';
// TODO Сделать добавление категории модалкой с выбором группы
// TODO сделать сделать редактирование группы
// TODO и добавление категории
// TODO и удаление категории

const expensesCategoriesStore = useExpensesGroupStore()
const confirmGroupDelete = ref(false)
const confirmCategoryDelete = ref(false)
// const selectedCategory = ref<string>();

// const handleFocus = (focus: boolean, category: ExpenseCategory) => {
//   if (focus) {
//     selectedCategory.value = category.name
//   } else {
//     if (selectedCategory.value !== category.name) {
//       if (category.id.startsWith('add')) {
//         expensesCategoriesStore.add(category.id, category.name)
//       } else {
//         expensesCategoriesStore.updateExpenseCategory(category)
//       }
//     }
//     selectedCategory.value = ''
//   }
// }

onMounted(() => {
  // expensesCategoriesStore.get()
})
</script>

<template>
  <v-card>
    <v-list bg-color="indigo-lighten-2">
      <v-list-group v-for="(group, index) in expensesCategoriesStore.expensesCategories" :key="group.id"
        :value="group.id">
        <template #activator="{ props }">
          <v-list-item v-bind="props" color="indigo-lighten-5">
            <div class="d-flex justify-space-between">
              <v-list-item-title class="font-weight-bold text-uppercase" append-icon="mdi-pencil">{{ group.name }}</v-list-item-title>
              <v-list-item-action class="ga-3">
                <v-icon @click.stop="handleEditGroup(group)">mdi-pencil</v-icon>
                <confirmation v-model="confirmGroupDelete"
                  :message="`Вы действительно хотите удалить группу ${group.name}`"
                  @confirm="expensesCategoriesStore.deleteGroup(group.id)">
                  <template #activator="{ props }">
                    <v-icon v-bind="props">mdi-delete</v-icon>
                  </template>
                </confirmation>
              </v-list-item-action>
            </div>
          </v-list-item>
          <v-divider v-if="index !== expensesCategoriesStore.expensesCategories.length - 1" color="indigo-lighten-5" />
        </template>
        <v-list-item v-for="category in group.items" :key="category.id" color="indigo-lighten-5">
          <div class="d-flex justify-space-between">
            <v-list-item-title>{{ category.name }}</v-list-item-title>
            <v-list-item-action class="ga-3">
              <v-btn @click.stop="handleEditCategory(category)" density="compact" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <confirmation v-model="confirmCategoryDelete"
                :message="`Вы действительно хотите удалить категорию ${category.name}`"
                @confirm="expensesCategoriesStore.deleteCategory(category.id, group.id)">
                <template #activator="{ props }">
                  <v-btn v-bind="props" density="compact" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </confirmation>
            </v-list-item-action>
          </div>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
