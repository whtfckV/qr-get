import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getProfitsGraphPoints } from '@/api/reports/graphs'
import { GraphStep, ProfitRequestBody, Profits } from '@/types/reports/graphs'
import moment from 'moment'

export const useProfitsGraph = defineStore('ProfitsGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Profits>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')

  const createFilters = (): ProfitRequestBody => ({
    partners: filtersStore.filters.partners.map(({ id }) => id),
    date_start: moment(filtersStore.filters.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(filtersStore.filters.dates.at(-1)).format('YYYY-MM-DD'),
    step: step.value,
  })

  const get = async () => {
    isLoading.value = true
    try {
      console.log(filtersStore.filters)
      const response = await getProfitsGraphPoints(createFilters())

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

  watch([step, filtersStore.filters], () => {
    get()
  })

  return {
    graph,
    step,
    get,
  }
})
