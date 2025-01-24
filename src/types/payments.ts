export type Payment = {
  date: string,
  fact_sum: number,
  plan_sum: number,
  expenses_sum: number,
}

export type PaymentFilters = {
  date_start: string,
  date_end: string
}
