import { Api } from './..'
import { ApiError, ApiResponse } from '@/types/api'
import type { FilterEntity } from '@/types/reports/filters'
import { Get } from './../types'

export const getCustomersFilters = async (): Promise<ApiResponse<FilterEntity[]> | ApiError> => {
  return Api.get<FilterEntity[]>(Get.customers)
}

export const getProductsFilters = async (): Promise<ApiResponse<FilterEntity[]> | ApiError> => {
  return Api.get<FilterEntity[]>(Get.products)
}

export const getPartnersFilters = async (): Promise<ApiResponse<FilterEntity[]> | ApiError> => {
  return Api.get<FilterEntity[]>(Get.partners)
}
