import { deleteExpense } from "@/api/expenses";
import { getExpensesGroups } from "@/api/groups";
import { ExpenseGroup } from "@/types/expenses";
import { defineStore } from "pinia";

export const useExpesesGroupStore = defineStore("expensesGroup", () => {
  const isLoading = ref(false);
  const items = ref<ExpenseGroup[]>([]);

  const get = async () => {
    isLoading.value = true;
    try {
      const response = await getExpensesGroups();
      if (response.success) {
        items.value.splice(0);
        items.value.push(...response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Get Expenses Groups Error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const del = async (id: ExpenseGroup['id']) => {
    try {
      const response = await deleteExpense(id);
      if (response.success) {
        items.value = items.value.filter((group) => group.id !== id);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isLoading,
    items,
    get,
    del,
  };
});
