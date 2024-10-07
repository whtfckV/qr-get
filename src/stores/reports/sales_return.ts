import { defineStore } from 'pinia'
import type {
  ReportType,
  SellersReturn,
} from '@/types/reports/sales_return'
import { getSalesReturnsReport } from '@/api/reports/reports'
import moment from 'moment'
import { useSalesGraph } from '../graphs/sales'

export const useSalesReturnsStore = defineStore('partner', () => {
  const data = reactive<SellersReturn[]>([])
  const isLoading = ref(false)
  const error = ref()
  // filters
  const partners = ref<string[]>([])
  const products = ref<string[]>([])
  const customers = ref<string[]>([])
  const dates = ref([new Date(), new Date()])
  const type = ref<ReportType>('sell')

  const salesGraphStore = useSalesGraph()

  const getPartners = async () => {
    if (!data.length) {
      isLoading.value = true
    }
    const start = dates.value[0]
    const end = dates.value.at(-1)

    const filters = {
      partners: partners.value,
      customers: customers.value,
      products: products.value,
      type: type.value,
      date_start: moment(start).format('YYYY-MM-DD'),
      date_end: moment(end).format('YYYY-MM-DD'),
    }

    try {
      const response = await getSalesReturnsReport(filters)

      if (response.success) {
        data.splice(0)
        data.push(...response.data)
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get partners error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  watch([dates, type], () => {
    getPartners()
    salesGraphStore.get()
  })

  return {
    data,
    partners,
    products,
    customers,
    dates,
    type,
    getPartners,
  }
})
