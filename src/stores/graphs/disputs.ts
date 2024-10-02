import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getDisputsGraphPoints } from '@/api/reports/graphs'
import { Disputs } from '@/types/reports/graphs'

const MOCK_FILTERS = {
  partners: [
    '9c834e39-01c1-4d1e-a55f-f039e5af8bc1',
    'c5bca640-d4ce-4210-931d-972cc327d18d',
  ],
  products: [
    '1a16925c-39e1-454b-8f3d-51fb9e22152f',
  ],
  date_start: '2024-10-01',
  date_end: '2024-10-01',
}

export const useDisputsGraph = defineStore('DisputsGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Disputs>([])
  const isLoading = ref(false)
  const error = ref('')

  const get = async () => {
    isLoading.value = true
    try {
      console.log(filtersStore.filters)
      const response = await getDisputsGraphPoints(MOCK_FILTERS)

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
