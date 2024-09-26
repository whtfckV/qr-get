// import { SelectSettings } from '@/types/settings'
import { getUsers, updateUserSettings } from '@/api/users'
import { SelectSettings, updateSettings } from '@/types/settings'
import { User, Users } from '@/types/users'
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
          typeof bool === 'boolean' && bool ? setting : ''
        )
        .filter(settings => settings)
    })
  }

  const updateSettings = async (usr: User) => {
    const data: updateSettings = {
      report_sales_returns: usr.settings.report_sales_returns,
      report_disput: usr.settings.report_disput,
      report_profit: usr.settings.report_profit,
    }
    try {
      const response = await updateUserSettings(data, usr.id)
      if (response.success) {
        usr.settings = response.data
      }
    } catch (error) {
      console.log('Update settings error', error)
    }
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

  const updateLocalSettings = async (id: string) => {
    users.map(user => {
      if (user.id === id) {
        Object.keys(user.settings).forEach(userSetting => {
          if (userSetting !== 'id') {
            user.settings[userSetting] =
              usersSettings[user.id].includes(userSetting)
          }
        })
        updateSettings(user)
      }
      return user
    })
  }
  return {
    users,
    usersSettings,
    error,
    isLoading,
    getUsersWithSettings,
    updateLocalSettings,
  }
})
