import { ApiError, ApiResponse } from '@/types/api'
import { Api } from '..'
import type { SellersReturn } from '@/types/reports/sales_return'
import type { Disputs } from '@/types/reports/disput'
import type { Profits } from '@/types/reports/profit'
import { Post } from '../types'

export const getSalesReturnsReport = async (body: Object): Promise<ApiResponse<SellersReturn[]> | ApiError> => {
  return Api.post<SellersReturn[]>(Post.partners, JSON.stringify(body))
}

export const getProfitsReport = async (body: Object): Promise<ApiResponse<Profits[]> | ApiError> => {
  return Api.post<Profits[]>(Post.disputs, JSON.stringify(body))
}

export const getDisputsReport = async (body: Object): Promise<ApiResponse<Disputs[]> | ApiError> => {
  return Api.post<Disputs[]>(Post.disputs, JSON.stringify(body))
}
