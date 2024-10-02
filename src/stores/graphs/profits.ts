import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getProfitsGraphPoints } from '@/api/reports/graphs'
import { Profits } from '@/types/reports/graphs'

const MOCK_FILTERS = {
  partners: [
    '5c8c3333-1321-4ce0-bf83-d5d81e5efcca',
    'b3dfb8f4-c8e8-4394-910e-55f069d4b64d',
  ],
  date_start: '2024-10-01',
  date_end: '2024-10-01',
}

export const useProfitsGraph = defineStore('ProfitsGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Profits>([])
  const isLoading = ref(false)
  const error = ref('')

  const get = async () => {
    isLoading.value = true
    try {
      console.log(filtersStore.filters)
      const response = await getProfitsGraphPoints(MOCK_FILTERS)

      if (response.success) {
        graph.value.splice(0)
        graph.value.push(...response.data)
      } else {
        error.value = response.details
        throw response.error
      }
    } catch (error) {
      console.log('Get Profit Graph Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    graph,
    get,
  }
})
