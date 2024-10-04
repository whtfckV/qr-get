import { defineStore } from 'pinia'
import type { Profits } from '@/types/reports/profit'
import { getProfitsReport } from '@/api/reports/reports'
import { useFiltersStore } from './filters'
import moment from 'moment'

// const filters = {
//   partners: [
//     'b9c64d47-6f70-4084-8012-b33f8d4cc4cc',
//     '236fb7ff-bb24-4966-b6a7-b8fdc145f45c',
//   ],
//   customers: [
//     '410ff829-a8cf-4430-a887-0cc69dd25747',
//   ],
//   products: [
//     '743bf09e-373b-4f0f-9816-dd679f733250',
//   ],
//   date_start: '2024-08-26',
//   date_end: '2024-09-25',
//   type: 'sell',
// }

export const useProfitStore = defineStore('profit', () => {
  const profits = reactive<Profits[]>([])
  const isLoading = ref(false)
  const error = ref()
  const filterStore = useFiltersStore()

  const getProfits = async () => {
    if (!profits.length) {
      isLoading.value = true
    }

    const start = filterStore.filters.dates[0]
    const end = filterStore.filters.dates.at(-1)

    const filters = {
      partners: filterStore.filters.partners.map(({ id }) => id),
      date_start: moment(start).format('YYYY-MM-DD'),
      date_end: moment(end).format('YYYY-MM-DD'),
    }

    try {
      const response = await getProfitsReport(filters)

      if (response.success) {
        profits.splice(0)
        profits.push(...response.data)
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
    profits,
    getProfits,
  }
})
