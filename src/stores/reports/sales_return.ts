import { defineStore } from 'pinia'
import type { SellersReturn } from '@/types/reports/sales_return'
import { getSalesReturnsReport } from '@/api/reports/reports'
import { useFiltersStore } from './filters'
import moment from 'moment'

export const useSalesReturnsStore = defineStore('partner', () => {
  const partners = reactive<SellersReturn[]>([])
  const isLoading = ref(false)
  const error = ref()
  const filterStore = useFiltersStore()

  const getPartners = async () => {
    if (!partners.length) {
      isLoading.value = true
    }
    const start = filterStore.filters.dates[0]
    const end = filterStore.filters.dates.at(-1)

    const filters = {
      partners: filterStore.filters.selectedPartners.map(({ id }) => id),
      customers: filterStore.filters.selectedCustomers.map(({ id }) => id),
      products: filterStore.filters.selectedProducts.map(({ id }) => id),
      type: filterStore.filters.typeFilter.valueOf(),
      date_start: moment(start).format('YYYY-MM-DD'),
      date_end: moment(end).format('YYYY-MM-DD'),
    }

    console.log(filters)

    try {
      const response = await getSalesReturnsReport(filters)

      if (response.success) {
        partners.splice(0)
        partners.push(...response.data)
      } else {
        error.value = response.error
      }
    } catch (error) {
      console.log('Get partners error: ' + error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    partners,
    getPartners,
  }
})
