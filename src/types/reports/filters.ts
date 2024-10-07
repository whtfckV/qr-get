export type FilterEntity = {
  id: string
  name: string
}

export type FiltersTypes = 'partners' | 'products'| 'customers'

export type Filters = Record<FiltersTypes, FilterEntity[]>
