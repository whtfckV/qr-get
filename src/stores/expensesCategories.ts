import {
  addExpenseCategory,
  getExpensesCategories,
  deleteExpense,
  // getExpensesGroups,
  updateExpense,
} from "@/api/expenses";
import { ExpenseCategory } from "@/types/expenses";
import { defineStore } from "pinia";

export const useExpensesCategoriesStore = defineStore(
  "expensesCategories",
  () => {
    const items = ref<ExpenseCategory[]>([]);
    const isLoading = ref(false);

    const get = async () => {
      if (!items.value.length) {
        isLoading.value = true;
      }
      try {
        const response = await getExpensesCategories();
        if (response.success) {
          items.value.splice(0);
          items.value.push(...response.data);
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log("Get Expenses Categories Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const del = async (id: string) => {
      if (id.startsWith("add")) {
        items.value.splice(items.value.findIndex((category) => category.id === id), 1);
        return;
      }
      try {
        const response = await deleteExpense(id);
        if (response.success) {
          items.value.splice(items.value.findIndex((category) => category.id === id), 1);
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const create = () => {
      items.value.push({
        id: "add" + Date.now(),
        name: "",
      });
    };

    const add = async (id: string, name: string) => {
      try {
        const response = await addExpenseCategory(name);
        if (response.success) {
          items.value.map((category) => {
            if (category.id === id) {
              category.id = response.data.id;
            }
          });
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const updateExpenseCategory = async (category: ExpenseCategory) => {
      try {
        const response = await updateExpense(category);
        if (!response.success) {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      items,
      isLoading,
      get,
      create,
      add,
      updateExpenseCategory,
      del,
    };
  }
);
