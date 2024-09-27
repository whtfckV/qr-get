import { getPartnersFilters } from '@/api/reports/filters'
import { FilterEntityTranformed } from '@/types/reports/filters'
import { defineStore } from 'pinia'

export const useFiltersPartnersStore = defineStore('partners', () => {
  const filters = reactive<FilterEntityTranformed[]>([])
  const isLoading = ref(false)
  const error = ref()

  const getFilter = async () => {
    try {
      const response = await getPartnersFilters()
      if (response.success) {
        filters.splice(0)
        const transformedData = response.data.map(item => ({
          value: item.id,
          title: item.name,
        }))
        filters.push(...transformedData)
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
