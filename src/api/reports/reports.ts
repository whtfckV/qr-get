import { ApiError, ApiResponse } from '@/types/api'
import { Api } from '..'
import type { SellersData } from '@/types/reports/sales_return'
import type { Disputs } from '@/types/reports/disput'
import type { Profit } from '@/types/reports/profit'
import { Post } from '../types'

export const getSalesReturnsReport = async (body: Object): Promise<ApiResponse<SellersData> | ApiError> => {
  return Api.post<SellersData>(Post.partners, JSON.stringify(body))
}

export const getProfitsReport = async (body: Object): Promise<ApiResponse<Profit> | ApiError> => {
  return Api.post<Profit>(Post.profit, JSON.stringify(body))
}

export const getDisputsReport = async (body: Object): Promise<ApiResponse<Disputs> | ApiError> => {
  return Api.post<Disputs>(Post.disputs, JSON.stringify(body))
}

export const getExelReport = async (body: Object): Promise<ApiResponse<Blob> | ApiError> => {
  return Api.postFile<Blob>(Post.getExelReturns, JSON.stringify(body))
}
