import { defineStore } from 'pinia'
import { useFiltersStore } from '../reports/filters'
import { getSalesGraphPoints } from '@/api/reports/graphs'
import { GraphStep, GraphType, Sales, SalesRequestBody } from '@/types/reports/graphs'
import moment from 'moment'

export const useSalesGraph = defineStore('salesGraph', () => {
  const filtersStore = useFiltersStore()

  const graph = ref<Sales>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')
  const type = ref<GraphType>('sum')

  const createFilters = (): SalesRequestBody => ({
    partners: filtersStore.filters.selectedPartners.map(({ id }) => id),
    customers: filtersStore.filters.selectedCustomers.map(({ id }) => id),
    products: filtersStore.filters.selectedProducts.map(({ id }) => id),
    date_start: moment(filtersStore.filters.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(filtersStore.filters.dates.at(-1)).format('YYYY-MM-DD'),
    step: step.value,
    type: type.value,
  })

  const get = async () => {
    isLoading.value = true
    try {
      const response = await getSalesGraphPoints(createFilters())
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
