import { defineStore } from 'pinia'
import { getProfitsGraphPoints } from '@/api/reports/graphs'
import { GraphOldStep, GraphStep, ProfitRequestBody, Profits } from '@/types/reports/graphs'
import moment from 'moment'
import { useProfitStore } from '../reports/profit'

export const useProfitsGraph = defineStore('ProfitsGraph', () => {
  const graph = ref<Profits>([])
  const oldGraph = ref<Profits>([])
  const isLoading = ref(false)
  const error = ref('')
  const step = ref<GraphStep>('day')
  const oldStep = ref<GraphOldStep>('month')

  const profitStore = useProfitStore()

  const createFilters = (old: boolean = false): ProfitRequestBody => {
    let startDate = moment(profitStore.dates[0]).clone();
    let endDate = moment(profitStore.dates.at(-1)).clone();

    if (old) {
      if (oldStep.value === "month") {
        startDate = startDate.subtract(1, 'month');
        endDate = endDate.subtract(1, 'month');
      } else if (oldStep.value === "year") {
        startDate = startDate.subtract(1, 'year');
        endDate = endDate.subtract(1, 'year');
      }
    }

    return {
      partners: profitStore.partners,
      date_start: startDate.format('YYYY-MM-DD'),
      date_end: endDate.format('YYYY-MM-DD'),
      step: step.value,
    }
  }

  const get = async () => {
    isLoading.value = true;
    try {
      await Promise.all([getProfit(), getOldProfit()]);
    } catch (error) {
      console.log("Get Profit Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  }

  const getProfit = async () => {
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
    }
  }

  const getOldProfit = async () => {
    try {
      const response = await getProfitsGraphPoints(createFilters(true))

      if (response.success) {
        oldGraph.value.splice(0)
        oldGraph.value.push(...response.data)
      } else {
        error.value = response.details
        throw response.error
      }
    } catch (error) {
      console.log('Get Profit Graph Error:', error)
    }
  }

  watch(oldStep,() => {
    getOldProfit()
  })

  watch(step, () => {
    get()
  })

  return {
    graph,
    oldGraph,
    step,
    oldStep,
    get,
  }
})
