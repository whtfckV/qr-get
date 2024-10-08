import { registerUser } from '@/api/auth'
import { RegisterBodyRequest } from '@/types/auth'
import { defineStore } from 'pinia'

export const useNewUserStore = defineStore('newUser', () => {
  const name = ref('')
  const surname = ref('')
  const patronymic = ref('')
  const username = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const register = async (callback?: () => void) => {
    const body: RegisterBodyRequest = {
      name: name.value,
      surname: surname.value,
      patronymic: patronymic.value,
      username: username.value,
      password: password.value,
    }

    try {
      loading.value = true
      const response = await registerUser(body)

      if (!response.success) {
        throw new Error(response.details)
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    } finally {
      loading.value = false
      if (!error.value) {
        clear()
        callback?.()
      }
    }
  }

  const clear = () => {
    name.value = ''
    surname.value = ''
    patronymic.value = ''
    username.value = ''
    password.value = ''
  }

  return {
    name,
    surname,
    patronymic,
    username,
    password,
    loading,
    register,
  }
})
