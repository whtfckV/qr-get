import { ApiError, ApiResponse } from "@/types/api";
import { Payment, PaymentFilters } from "@/types/payments";
import { Api } from ".";
import { Post } from "./types";

export const getPayments = async (body: PaymentFilters): Promise<ApiResponse<Payment[]> | ApiError> => {
  return Api.post<Payment[]>(Post.payments, JSON.stringify(body));
}
