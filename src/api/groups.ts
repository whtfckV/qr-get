import { ApiError, ApiResponse } from "@/types/api";
import { ExpensesGroup } from "@/types/expenses";
import { Delete, Get } from "./types";
import { Api } from ".";

export const getExpensesGroups = async (): Promise<
  ApiResponse<ExpensesGroup[]> | ApiError
> => Api.get<ExpensesGroup[]>(Get.groups);

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
