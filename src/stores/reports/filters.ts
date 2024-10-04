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
  // const partnersSelecterd = reactive([])
  const filters = reactive<Filters>({
    partners: [],
    products: [],
    customers: [],
    selectedPartners: [],
    selectedProducts: [],
    selectedCustomers: [],
    typeFilter: 'sell',
    dates: [new Date(), new Date()],
  })

  const isLoading = ref(false)
  const error = ref()

  const getValuesFilters = (data: FilterEntity[], filterType: FiltersTypes) => {
    filters[filterType].splice(0)
    // const transformedData = data.map(item => ({
    //   value: item.id,
    //   title: item.name,
    // }))
    filters[filterType].push(...data)
  }

  const updateFilter = (data: FilterEntity[], filterType: FiltersTypes) => {
    // filters[filterType].splice(0)
    console.log(`suka ${data}`)
    filters[filterType].push(...data)
    filters.typeFilter = 'sell'
  }

  const getFilter = async (filterType: FiltersTypes) => {
    try {
      const response = await FiltersMethods[filterType]()
      if (response.success) {
        getValuesFilters(response.data, filterType)
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
    updateFilter,
    getFilter,
  }
})
