import { ApiError, ApiResponse } from '@/types/api'
import { Disputs, DisputsRequestBody, ProfitRequestBody, Profits, Sales, SalesRequestBody } from '@/types/reports/graphs'
import { Api } from '..'
import { Graphs } from '../types'

export const getSalesGraphPoints = async (filters: SalesRequestBody): Promise<ApiResponse<Sales> | ApiError> => {
  return Api.post<Sales>(Graphs.sales, JSON.stringify(filters))
}

export const getDisputsGraphPoints = async (filters: DisputsRequestBody): Promise<ApiResponse<Disputs> | ApiError> => {
  return Api.post<Disputs>(Graphs.disputs, JSON.stringify(filters))
}

export const getProfitsGraphPoints = async (filters: ProfitRequestBody): Promise<ApiResponse<Profits> | ApiError> => {
  return Api.post<Profits>(Graphs.profits, JSON.stringify(filters))
}
