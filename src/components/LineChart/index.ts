import { ChartDataset } from 'chart.js'
import LineChart from './LineChart.vue'

export interface CustomDataset extends ChartDataset<'line', (number | null)[]> {}

type Point = {
  period: Date,
  sales: number,
  returns: number,
  remaind: number,
}

export type Props = {
  data: Point[]
  oldData?: Point[]
}

export { LineChart }
