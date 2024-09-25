// import { SelectSettings } from '@/types/settings'
import { getUsers } from '@/api/users'
import { SelectSettings } from '@/types/settings'
import { Users } from '@/types/users'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = reactive<Users>([])
  const usersSettings = reactive<SelectSettings>({})
  const isLoading = ref(false)
  const error = ref<string | Error>('')

  const createSettings = () => {
    users.forEach(user => {
      usersSettings[user.id] = Object.entries(user.settings)
        .map(([setting, bool]) =>
          typeof bool === 'boolean' && bool
            ? setting
            : ''
        )
        .filter(settings => settings)
    })
  }

  const getUsersWithSettings = async () => {
    if (!users.length) {
      isLoading.value = true
    }

    try {
      const response = await getUsers()

      if (response.success) {
        users.splice(0)
        users.push(...response.data)
        createSettings()
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get users error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  const updateSettings = async (id: string) => {
    users.map(user => {
      if (user.id === id) {
        // const settings = Object.entries(user.settings).filter(([_, value]) => typeof value !== 'string')
        // console.log(settings)
        return user
        // user.settings = {
        //   ...user.settings,
        // }
        // await updateUserSettings(user.settings, id)
      } else {
        return user
      }
    })
  }

  // watch(usersSettings, () => {
  //   console.log(usersSettings)
  // })

  return {
    users,
    usersSettings,
    error,
    isLoading,
    getUsersWithSettings,
    updateSettings,
  }
})
