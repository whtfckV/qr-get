import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getDisputsGraphPoints } from '@/api/reports/graphs'
import { Disputs, DisputsRequestBody, GraphStep, GraphType } from '@/types/reports/graphs'
import moment from 'moment'

export const useDisputsGraph = defineStore('DisputsGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Disputs>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')
  const type = ref<GraphType>('sum')

  const createFilters = (): DisputsRequestBody => ({
    partners: filtersStore.filters.partners.map(({ value }) => value),
    products: filtersStore.filters.products.map(({ value }) => value),
    date_start: moment(filtersStore.filters.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(filtersStore.filters.dates.at(-1)).format('YYYY-MM-DD'),
    step: step.value,
  })

  const get = async () => {
    isLoading.value = true
    try {
      console.log(filtersStore.filters)
      const response = await getDisputsGraphPoints(createFilters())

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

  watch([step, type, filtersStore.filters], () => {
    get()
  })

  return {
    graph,
    step,
    type,
    get,
  }
})
