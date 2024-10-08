import { getCustomersFilters, getPartnersFilters, getProductsFilters } from '@/api/reports/filters'
import { ApiError, ApiResponse } from '@/types/api'
import { FilterEntity, Filters, FiltersTypes } from '@/types/reports/filters'
import { defineStore } from 'pinia'

const FiltersMethods: Record<FiltersTypes, () => Promise<ApiResponse<FilterEntity[]> | ApiError>> = {
  customers: getCustomersFilters,
  products: getProductsFilters,
  partners: getPartnersFilters,
}

export const useFiltersStore = defineStore('filters', () => {
  const filters = reactive<Filters>({
    partners: [],
    products: [],
    customers: [],
  })

  const isLoading = ref(false)
  const error = ref()

  const setValuesFilters = (data: FilterEntity[], filterType: FiltersTypes) => {
    filters[filterType].splice(0)
    filters[filterType].push(...data)
  }

  const getFilter = async (filterType: FiltersTypes) => {
    if (filters[filterType].length) return
    try {
      const response = await FiltersMethods[filterType]()
      if (response.success) {
        setValuesFilters(response.data, filterType)
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
    filters,
    getFilter,
  }
})
