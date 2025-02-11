import { ApiError, ApiResponse } from "@/types/api"
import { Api } from "."
import { Get, Post } from "./types"
import { Balance, Payment, PaymentBody } from "@/types/balance"

export const getBalance = async (): Promise<ApiResponse<Balance> | ApiError> => {
  return Api.get<Balance>(Get.balance)
}

export const addPayment = async (body: PaymentBody): Promise<ApiResponse<Payment> | ApiError> => {
  return Api.post<Payment>(Post.addPayment, JSON.stringify(body))
}
