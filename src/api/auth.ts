import type { ApiError, ApiResponse } from '@/types/api'
import { Api, Post } from '.'
// import type { GenerateRequestBody, GenerateResponse } from "@/types/generation"

type Token = {
  access_token: string
  token_type: string
}
export const token = async (body: Object): Promise<ApiResponse<Token> | ApiError> => {
  const formattedBody = new URLSearchParams(body as Record<string, string>).toString()
  return Api.post<Token, Object>(Post.login, formattedBody)
}
