import { ApiError, ApiResponse } from "@/types/api";
import {
  Expense,
  ExpenseBody,
  ExpenseCategory,
  ExpensesGroup,
} from "@/types/expenses";
import { Api } from ".";
import { Delete, Get, Post, Put } from "./types";

export const getExpensesCategories = async (): Promise<
  ApiResponse<ExpenseCategory[]> | ApiError
> => {
  return Api.get<ExpenseCategory[]>(Get.categories);
};

export const getExpensesGroups = async (): Promise<
  ApiResponse<ExpensesGroup[]> | ApiError
> => Api.get<ExpensesGroup[]>(Get.groups);

export const deleteExpensesGroup = async (
  id: string
): Promise<ApiResponse<number> | ApiError> => {
  return Api.delete<number>(Delete.group, id);
};

export const addExpense = async (
  body: ExpenseBody
): Promise<ApiResponse<Expense> | ApiError> => {
  return Api.post<Expense>(Post.addExpense, JSON.stringify(body));
};

export const updateExpense = async (
  body: ExpenseCategory
): Promise<ApiResponse<ExpenseCategory> | ApiError> => {
  return Api.put<ExpenseCategory>(
    Put.updateExpense,
    JSON.stringify({ name: body.name }),
    body.id
  );
};

export const deleteExpenseInGroup = async (
  id: string
): Promise<ApiResponse<number> | ApiError> => {
  return Api.delete<number>(Delete.expensesInGroup, id);
};

export const addExpenseCategory = async (
  name: string
): Promise<ApiResponse<ExpenseCategory> | ApiError> => {
  const body = JSON.stringify({ name });
  return Api.post<ExpenseCategory>(Post.addExpenseCategory, body);
};
