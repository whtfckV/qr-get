import { GraphStep } from '@/types/reports/graphs'

export function formatDate (step: GraphStep): string {
  switch (step) {
    case 'day':
      return 'DD.MM'
    case 'week':
      return 'WW'
    case 'month':
      return 'MM.YY'
    default:
      return 'DD.MM.YYYY'
  }
}
