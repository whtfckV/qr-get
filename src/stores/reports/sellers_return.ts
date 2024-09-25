import { defineStore } from 'pinia'
import type { SellersReturn } from '@/types/reports/sellers_return'
import { getReport } from '@/api/sellers_returns'

export const usePartnersStore = defineStore('partner', () => {
  const partners = reactive<SellersReturn[]>([])
  const isLoading = ref(false)
  const error = ref()

  const getPartners = async () => {
    if (!partners.length) {
      isLoading.value = true
    }

    try {
      const response = await getReport('hyi')

      if (response.success) {
        partners.splice(0)
        partners.push(...response.data)
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get users error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    partners,
    getPartners,
  }
})
