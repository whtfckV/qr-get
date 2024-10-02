import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getSalesGraphPoints } from '@/api/reports/graphs'
import { Sales } from '@/types/reports/graphs'

const MOCK_FILTERS = {
  partners: [
    'b6be3f21-6674-43c6-84f6-baa0921d02e7',
    'f4b853ea-4e00-4268-ad40-89c92db47932',
  ],
  customers: [
    'af6d3e71-0373-48b7-b3e6-37c116d771c5',
  ],
  products: [
    '5acf7e0f-ec58-4758-9e3d-01268d94c627',
  ],
  date_start: '2024-09-01',
  date_end: '2024-10-01',
  type: 'sell',
}

export const useSalesGraph = defineStore('salesGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Sales>([])
  const isLoading = ref(false)
  const error = ref('')

  const get = async () => {
    isLoading.value = true
    try {
      console.log(filtersStore.filters)
      const response = await getSalesGraphPoints(MOCK_FILTERS)

      if (response.success) {
        graph.value.splice(0)
        graph.value.push(...response.data)
      } else {
        error.value = response.details
        throw response.error
      }
    } catch (error) {
      console.log('Get Sales Graph Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    graph,
    get,
  }
})
