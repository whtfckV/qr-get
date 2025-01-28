import {
  deleteExpenseInGroup,
  deleteExpensesGroup,
  getExpensesGroups,
} from "@/api/expenses";
import { ExpensesGroup } from "@/types/expenses";
import { defineStore } from "pinia";

export const useExpensesGroupStore = defineStore(
  "expensesGroup",
  () => {
    const expensesCategories = ref<ExpensesGroup[]>([]);
    const isLoading = ref(false);

    const get = async () => {
      isLoading.value = true;
      try {
        const response = await getExpensesGroups();
        if (response.success) {
          expensesCategories.value = response.data;
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log("Get Expenses Group Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const deleteGroup = async (id: string) => {
      try {
        const response = await deleteExpensesGroup(id);
        if (response.success) {
          expensesCategories.value = expensesCategories.value.filter(
            (category) => category.id !== id
          );
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log(error);
      }
    };

    const deleteCategory = async (id: string, grouId: string) => {
      try {
        const response = await deleteExpenseInGroup(id);
        if (response.success) {
          expensesCategories.value = expensesCategories.value.map((group) => {
            if (group.id === grouId) {
              group.items = group.items.filter((expense) => expense.id !== id);
            }
            return group;
          });
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log(error);
      }
    };

    // const del = async (id: string) => {
    //   if (id.startsWith("add")) {
    //     expensesCategories.value = expensesCategories.value.filter(
    //       (category) => category.id !== id
    //     );
    //     return;
    //   }
    //   try {
    //     const response = await deleteExpense(id);
    //     if (response.success) {
    //       expensesCategories.value = expensesCategories.value.filter(
    //         (category) => category.id !== id
    //       );
    //     } else {
    //       throw new Error(response.error);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // const add = async (id: string, name: string) => {
    //   try {
    //     const response = await addExpenseCategory(name);
    //     if (response.success) {
    //       expensesCategories.value.map((category) => {
    //         if (category.id === id) {
    //           category.id = response.data.id;
    //         }
    //       });
    //     } else {
    //       throw new Error(response.error);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // const updateExpenseCategory = async (category: ExpenseCategory) => {
    //   try {
    //     const response = await updateExpense(category);
    //     if (!response.success) {
    //       throw new Error(response.error);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    return {
      expensesCategories,
      isLoading,
      get,
      deleteGroup,
      deleteCategory,
      // add,
      // updateExpenseCategory,
      // del,
    };
  }
);
