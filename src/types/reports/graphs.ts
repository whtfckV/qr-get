type Period = {
  period: string,
}

type SaleKeys = 'sales' | 'returns'| 'remaind'
type DisputKeys = 'value'
type ProfitKeys = 'value'

export type Sale = Record<SaleKeys, number> & Period
export type Disput = Record<DisputKeys, number> & Period
export type Profit = Record<ProfitKeys, number> & Period

export type Sales = Sale[]
export type Disputs = Disput[]
export type Profits = Profit[]

export type GraphType = 'sum' | 'amount'
export type GraphStep = 'day' | 'week'| 'month'

export type SalesRequestBody = {
  partners: string[],
  customers: string[],
  products: string[],
  date_start: string,
  date_end: string,
  type: GraphType
  step: GraphStep
}

export type DisputsRequestBody = Omit<SalesRequestBody, 'customers'>
export type ProfitRequestBody = Pick<SalesRequestBody, 'partners' | 'date_start'| 'date_end' | 'step'>
