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
    dates: [new Date(), new Date()],
    // date_start: new Date().toISOString().split('T')[0],
    // date_end: new Date().toISOString().split('T')[0],
  })

  const isLoading = ref(false)
  const error = ref()

  // const updateDate = (dates:any) => {
  //   filters.date_start = dates[0]
  //   filters.date_start = dates.At(-1)
  // }

  const updateFilter = (data: FilterEntity[], filterType: FiltersTypes) => {
    filters[filterType].splice(0)
    const transformedData = data.map(item => ({
      value: item.id,
      title: item.name,
    }))
    filters[filterType].push(...transformedData)
  }

  const getFilter = async (filterType: FiltersTypes) => {
    try {
      const response = await FiltersMethods[filterType]()
      if (response.success) {
        updateFilter(response.data, filterType)
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
    // updateDate,
    getFilter,
  }
})
