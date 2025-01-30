import { ApiError, ApiResponse } from "@/types/api";
import { ExpenseGroup } from "@/types/expenses";
import { Delete, Get, Post, Put } from "./types";
import { Api } from ".";

export const getExpensesGroups = async (): Promise<
  ApiResponse<ExpenseGroup[]> | ApiError
> => Api.get<ExpenseGroup[]>(Get.groupsWithItems);

export const getOnlyGroups = async (): Promise<
  ApiResponse<Omit<ExpenseGroup, "items">[]> | ApiError
> => Api.get<Omit<ExpenseGroup, "items">[]>(Get.groups);

export const addExpensesGroup = async (
  name: string
): Promise<ApiResponse<ExpenseGroup> | ApiError> =>
  Api.post<ExpenseGroup>(Post.addGroup, JSON.stringify({ name }));

export const deleteExpensesGroup = async (
  id: string
): Promise<ApiResponse<number> | ApiError> => {
  return Api.delete<number>(Delete.group, id);
};

export const deleteExpenseInGroup = async (
  id: string
): Promise<ApiResponse<number> | ApiError> => {
  return Api.delete<number>(Delete.expensesInGroup, id);
};

export const addExpenseToGroup = async (
  groupId: string,
  categoryId: string
): Promise<ApiResponse<ExpenseGroup> | ApiError> => {
  const body = {
    id_expense_category: categoryId,
    id_expense_group: groupId,
  };
  return Api.post<ExpenseGroup>(Post.addExpenseInGroup, JSON.stringify(body));
};

export const moveExpenseToGroup = async (
  expenseId: string,
  groupId: string
): Promise<ApiResponse<ExpenseGroup> | ApiError> => {
  const body = {
    item_id: expenseId,
  };
  return Api.put<ExpenseGroup>(
    Put.moveExpenseToGroup,
    JSON.stringify(body),
    groupId
  );
};
