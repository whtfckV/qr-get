export type FilterEntity = {
  id: string
  name: string
}

export type FiltersTypes = 'partners' | 'products'| 'customers'

export type FilterEntityTranformed = {
  title: string
  value: string
}

type FilterDates = {
  dates: Date[]
}

// type FilterType = {
//   date_start: string
//   date_end: string
// }

export type Filters = Record<FiltersTypes, FilterEntityTranformed[]>&FilterDates
