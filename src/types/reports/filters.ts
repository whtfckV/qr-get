export type FilterEntity = {
  id: string
  name: string
}

export type FiltersTypes = 'partners' | 'products'| 'customers'

type FilterDates = {
  dates: Date[]
}

export type SelectedFilters ={
  selectedPartners: FilterEntity[],
  selectedProducts: string[],
  selectedCustomers: FilterEntity[],
}

export type Filters = Record<FiltersTypes, FilterEntity[]>&FilterDates & { typeFilter: string } & SelectedFilters
