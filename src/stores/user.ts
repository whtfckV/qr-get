import { defineStore } from 'pinia'
import { jwtDecode, tJwtTokenDecode } from '@/utils/jwt_decode'

export const useUserStore = defineStore('user', () => {
  const user = ref<tJwtTokenDecode>()

  const getUserInfo = async () => {
    user.value = jwtDecode(localStorage.getItem('authToken'))
    // try {

    // } catch (error) {

    // }
  }

  return {
    user,
    getUserInfo,
  }
})
