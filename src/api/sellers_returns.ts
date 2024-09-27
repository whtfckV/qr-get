import { ApiError, ApiResponse } from '@/types/api'
import { Api } from '.'
import type { SellersReturn } from '@/types/reports/sellers_return'
import { Post } from './types'

export const getReport = async (body: Object): Promise<ApiResponse<SellersReturn[]> | ApiError> => {
  return Api.post<SellersReturn[]>(Post.partners, JSON.stringify(body))
  return Api.post<SellersReturn[]>(Post.partners, JSON.stringify(body))
}
