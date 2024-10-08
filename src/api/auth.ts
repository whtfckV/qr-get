import type { ApiError, ApiResponse } from '@/types/api'
import { Api } from '.'
import { Post, Token } from './types'
import { RegisterBodyRequest, RegisterResponse } from '@/types/auth'
// import type { GenerateRequestBody, GenerateResponse } from "@/types/generation"

export const token = async (body: Object): Promise<ApiResponse<Token> | ApiError> => {
  const formattedBody = new URLSearchParams(body as Record<string, string>).toString()
  return Api.post<Token>(Post.login, formattedBody)
}

export const registerUser = async (body: RegisterBodyRequest): Promise<ApiResponse<RegisterResponse> | ApiError> =>
  Api.post<RegisterResponse>(Post.register, JSON.stringify(body))
