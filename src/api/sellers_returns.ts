import { ApiError, ApiResponse } from '@/types/api'
import { Api, Post } from '.'
import type { SellersReturn } from '@/types/reports/sellers_return'

export const getReport = async (body: Object): Promise<ApiResponse<SellersReturn[]> | ApiError> => {
  return Api.post<SellersReturn[], string>(Post.partners, JSON.stringify(body))
}
