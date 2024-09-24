import type { ApiError, ApiResponse } from '@/types/api'
import { Api, Post } from "."
// import type { GenerateRequestBody, GenerateResponse } from "@/types/generation"

type Token = {
  access_token: string
  token_type: string
}
export const token = async (body: Object): Promise<ApiResponse<Token> | ApiError> => {
  return await Api.post<Token, Object>(Post.login, body)
}
