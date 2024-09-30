import type { ApiError, ApiResponse } from '@/types/api'
import { Api } from '.'
import { Post, Token } from './types'
// import type { GenerateRequestBody, GenerateResponse } from "@/types/generation"

export const token = async (body: Object): Promise<ApiResponse<Token> | ApiError> => {
  const formattedBody = new URLSearchParams(body as Record<string, string>).toString()
  return Api.post<Token>(Post.login, formattedBody)
}
