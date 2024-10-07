import { defineStore } from 'pinia'
import { getSalesGraphPoints } from '@/api/reports/graphs'
import { GraphStep, GraphType, Sales, SalesRequestBody } from '@/types/reports/graphs'
import moment from 'moment'
import { useSalesReturnsStore } from '../reports/sales_return'

export const useSalesGraph = defineStore('salesGraph', () => {
  const graph = ref<Sales>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')
  const type = ref<GraphType>('sum')

  const salesReturnsStore = useSalesReturnsStore()

  const createFilters = (): SalesRequestBody => ({
    partners: salesReturnsStore.partners,
    customers: salesReturnsStore.customers,
    products: salesReturnsStore.products,
    date_start: moment(salesReturnsStore.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(salesReturnsStore.dates.at(-1)).format('YYYY-MM-DD'),
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
