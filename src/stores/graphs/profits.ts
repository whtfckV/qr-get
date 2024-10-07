import { defineStore } from 'pinia'
import { getProfitsGraphPoints } from '@/api/reports/graphs'
import { GraphStep, ProfitRequestBody, Profits } from '@/types/reports/graphs'
import moment from 'moment'
import { useProfitStore } from '../reports/profit'

export const useProfitsGraph = defineStore('ProfitsGraph', () => {
  const graph = ref<Profits>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')

  const profitStore = useProfitStore()

  const createFilters = (): ProfitRequestBody => ({
    partners: profitStore.partners,
    date_start: moment(profitStore.dates[0]).format('YYYY-MM-DD'),
    date_end: moment(profitStore.dates.at(-1)).format('YYYY-MM-DD'),
    step: step.value,
  })

  const get = async () => {
    isLoading.value = true
    try {
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

  watch(step, () => {
    get()
  })

  return {
    graph,
    step,
    get,
  }
})
