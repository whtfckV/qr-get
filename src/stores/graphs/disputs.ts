import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getDisputsGraphPoints } from '@/api/reports/graphs'
import { Disputs, DisputsRequestBody, GraphStep, GraphType } from '@/types/reports/graphs'
import moment from 'moment'
import { useDisputsStore } from '../reports/disput'

export const useDisputsGraph = defineStore('DisputsGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Disputs>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')
  const type = ref<GraphType>('sum')

  const disputStore = useDisputsStore()

  const createFilters = (): DisputsRequestBody => ({
    partners: disputStore.partners,
    products: disputStore.products,
    date_start: moment(disputStore.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(disputStore.dates.at(-1)).format('YYYY-MM-DD'),
    step: step.value,
    type: type.value,
  })

  const get = async () => {
    isLoading.value = true
    try {
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

  watch([step, type], () => {
    get()
  })

  return {
    graph,
    step,
    type,
    get,
  }
})
