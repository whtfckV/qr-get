import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const filters = reactive<string[]>([])

  return { filters }
})
