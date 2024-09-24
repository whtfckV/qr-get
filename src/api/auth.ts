import type { ApiError, ApiResponse } from '@/types/api'
import { Api, Post } from "."
// import type { GenerateRequestBody, GenerateResponse } from "@/types/generation"

export const token = async (body: Object): Promise<ApiResponse<string> | ApiError> => {
  return await Api.post<string, Object>(Post.login, body)
}
