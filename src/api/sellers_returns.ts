import { ApiError, ApiResponse } from '@/types/api'
import type { SellersReturn } from '@/types/reports/sellers_return'
import { Post } from './enums'
import { Api } from '.'

export const getReport = async (body: Object): Promise<ApiResponse<SellersReturn[]> | ApiError> => {
  return Api.post<SellersReturn[]>(Post.partners, JSON.stringify(body))
}
