import { ChartDataset } from 'chart.js'
import LineChart from './LineChart.vue'

export interface CustomDataset extends ChartDataset<'line', (number | null)[]> {}

export type Props = {
  data: {
    period: Date,
    sales: number,
    returns: number,
    remaind: number,
  }[]
}

export { LineChart }
