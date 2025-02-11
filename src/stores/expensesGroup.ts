import {
  addExpensesGroup,
  addExpenseToGroup,
  deleteExpenseInGroup,
  deleteExpensesGroup,
  getExpensesGroups,
  moveExpenseToGroup,
} from "@/api/groups";
import { ExpenseGroup } from "@/types/expenses";
import { defineStore } from "pinia";

export const useExpesesGroupStore = defineStore("expensesGroup", () => {
  const isLoading = ref(false);
  const items = ref<ExpenseGroup[]>([]);
  const groups = ref<Omit<ExpenseGroup, "items">[]>([]);
  const error = ref("");

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

  const getOnlyGroups = async () => {
    try {
      const response = await getExpensesGroups();
      if (response.success) {
        groups.value.splice(0);
        groups.value.push(...response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Get Expenses Groups Error:", error);
    }
  };

  const del = async (id: ExpenseGroup["id"]) => {
    try {
      const response = await deleteExpensesGroup(id);
      if (response.success) {
        items.value = items.value.filter((group) => group.id !== id);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const add = async (name: string) => {
    try {
      const response = await addExpensesGroup(name);
      if (response.success) {
        items.value.push(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (groupId: string, categoryId: string): Promise<boolean> => {
    try {
      const response = await addExpenseToGroup(groupId, categoryId);
      if (response.success) {
        items.value.map((group) => {
          if (group.id === groupId) {
            group.items.push(response.data);
          }
        });
        return true
      } else {
        if (response.error.includes('400')) {
          error.value = response.details.detail;
          return false
        }
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
    return false
  };

  const moveCategory = async (categoryId: string, groupId: string, oldGroupId: string) => {
    console.log(groupId);
    console.log(categoryId);
    try {
      const response = await moveExpenseToGroup(categoryId, groupId);
      if (response.success) {
        items.value.map((group) => {
          if (group.id === oldGroupId) {
            group.items = group.items.filter((item) => item.id !== categoryId);
          }
        });
        items.value.map((group) => {
          if (group.id === groupId) {
            group.items.push(response.data);
          }
        });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (categoryId: string, groupId: string) => {
    try {
      const response = await deleteExpenseInGroup(categoryId);
      if (response.success) {
        items.value.map((group) => {
          if (group.id === groupId) {
            group.items = group.items.filter((item) => item.id !== categoryId);
          }
        });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    items,
    groups,
    error,
    get,
    getOnlyGroups,
    add,
    addCategory,
    moveCategory,
    deleteCategory,
    del,
  };
});
