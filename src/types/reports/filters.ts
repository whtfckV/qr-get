export type FilterEntity = {
  id: string
  name: string
}

export type FiltersTypes = 'partners' | 'products'| 'customers'

export type FilterEntityTranformed = {
  title: string
  value: string
}

export type Filters = Record<FiltersTypes, FilterEntityTranformed[]>
