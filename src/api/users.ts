import { ApiError, ApiResponse } from '@/types/api'
import { Api } from '.'
import { Get, Put } from './types'
import { Users } from '@/types/users'
import { Settings } from '@/types/settings'

export const getUsers = async (): Promise<ApiResponse<Users> | ApiError> => {
  return Api.get<Users>(Get.users)
}

export const updateUserSettings = async (body: Partial<Settings>, id: string): Promise<ApiResponse<Settings> | ApiError> => {
  return Api.put(Put.updateUserSettings, JSON.stringify(body), id)
}
