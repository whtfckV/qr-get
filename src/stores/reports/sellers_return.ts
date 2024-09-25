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
      const response = await getReport({
        partners: [
          'b9c64d47-6f70-4084-8012-b33f8d4cc4cc',
          '236fb7ff-bb24-4966-b6a7-b8fdc145f45c',
        ],
        customers: [
          '410ff829-a8cf-4430-a887-0cc69dd25747',
        ],
        products: [
          '743bf09e-373b-4f0f-9816-dd679f733250',
        ],
        date_start: '2024-08-26',
        date_end: '2024-09-25',
        type: 'sell',
      })

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
