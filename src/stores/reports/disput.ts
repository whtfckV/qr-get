import { defineStore } from 'pinia'
import type { Disput } from '@/types/reports/disput'
import { getDisputsReport } from '@/api/reports/reports'

const filters = {
  partners: [
    'b9c64d47-6f70-4084-8012-b33f8d4cc4cc',
    '236fb7ff-bb24-4966-b6a7-b8fdc145f45c',
  ],
  products: [
    '743bf09e-373b-4f0f-9816-dd679f733250',
  ],
  date_start: '2024-08-26',
  date_end: '2024-09-25',
}

export const useDisputsStore = defineStore('disput', () => {
  const disputs = reactive<Disput[]>([])
  const isLoading = ref(false)
  const error = ref()

  const getDisputs = async () => {
    if (!disputs.length) {
      isLoading.value = true
    }

    try {
      const response = await getDisputsReport(filters)

      if (response.success) {
        disputs.splice(0)
        disputs.push(
          ...response.data.disputs,
          response.data.total
        )
        console.log(disputs)
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get partners error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    disputs,
    getDisputs,
  }
})
