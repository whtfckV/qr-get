import { defineStore } from 'pinia'
import type { Disput } from '@/types/reports/disput'
import { getDisputsReport } from '@/api/reports/reports'
import moment from 'moment'
import { useDisputsGraph } from '../graphs/disputs'

// const FILTERS_MOCK = {
//   partners: [
//     'b9c64d47-6f70-4084-8012-b33f8d4cc4cc',
//     '236fb7ff-bb24-4966-b6a7-b8fdc145f45c',
//   ],
//   products: [
//     '743bf09e-373b-4f0f-9816-dd679f733250',
//   ],
//   date_start: '2024-08-26',
//   date_end: '2024-09-25',
// }

export const useDisputsStore = defineStore('disput', () => {
  const disputs = reactive<Disput[]>([])
  const isLoading = ref(false)
  const error = ref()

  const partners = ref<string[]>([])
  const products = ref<string[]>([])
  const dates = ref<Date[]>([new Date(), new Date()])

  const disputsGraphStore = useDisputsGraph()

  const getDisputs = async () => {
    if (!disputs.length) {
      isLoading.value = true
    }

    const start = dates.value[0]
    const end = dates.value.at(-1)

    const filters = {
      partners: partners.value,
      products: products.value,
      date_start: moment(start).format('YYYY-MM-DD'),
      date_end: moment(end).format('YYYY-MM-DD'),
    }

    try {
      const response = await getDisputsReport(filters)

      if (response.success) {
        disputs.splice(0)
        disputs.push(
          ...response.data.disputs,
          response.data.total
        )
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get partners error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  watch(dates, () => {
    getDisputs()
    disputsGraphStore.get()
  })

  return {
    disputs,
    products,
    partners,
    dates,
    getDisputs,
  }
})
