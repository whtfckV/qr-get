type Period = {
  period: string,
}

type SaleKeys = 'sales' | 'returns'| 'remaind'
type DisputKeys = 'amount' | 'sum'
type ProfitKeys = 'profit'

export type Sale = Record<SaleKeys, number> & Period
export type Disput = Record<DisputKeys, number> & Period
export type Profit = Record<ProfitKeys, number> & Period

export type Sales = Sale[]
export type Disputs = Disput[]
export type Profits = Profit[]

export type SalesRequestBody = {
  partners: string[],
  customers: string[],
  products: string[],
  date_start: string,
  date_end: string,
  type: string
}

export type DisputsRequestBody = Pick<SalesRequestBody, 'partners' | 'date_start' | 'date_end' | 'products'>
export type ProfitRequestBody = Pick<SalesRequestBody, 'partners' | 'date_start'| 'date_end'>
