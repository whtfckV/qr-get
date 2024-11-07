import { ApiError, ApiResponse } from '@/types/api'
import { Api } from '.'
import { Delete, Get, Put } from './types'
import { Users } from '@/types/users'
import { Settings } from '@/types/settings'

export const getUsers = async (): Promise<ApiResponse<Users> | ApiError> => {
  return Api.get<Users>(Get.users)
}

export const updateUserSettings = async (body: Partial<Settings>, id: string): Promise<ApiResponse<Settings> | ApiError> =>
  Api.put(Put.updateUserSettings, JSON.stringify(body), id)

export const deleteUser = async (id: string): Promise<ApiResponse<number>| ApiError> =>
  Api.delete<number>(Delete.user, id)

export const getUserSettings = async (id: string) =>
  Api.get<Settings>(`${Get.userSettings}/${id}`)
