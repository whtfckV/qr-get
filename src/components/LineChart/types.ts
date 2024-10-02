import { GraphStep, GraphType } from '@/types/reports/graphs'
import { ChartDataset } from 'chart.js'
export interface CustomDataset extends ChartDataset<'line', (number | null)[]> {}

export type TLine = {
  name: string,
  color: string,
  data: number[]
}

export type StepType = {
  title: string,
  value: GraphStep
}

export type Props = {
  dates: string[]
  data: TLine[]
  oldData: TLine[]
  y?: GraphType,
}
