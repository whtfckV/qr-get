// disput.ts

export type Disput = {
  // id: string
  name: string
  succesful_payments: number
  total_sum_services: number
  disputs: number
  disputs_sum: number
  disputs_percents_by_things: number
  disputs_percent_by_sum: number
}

export type Disputs = {
  disputs: Disput[]
  total: Disput
}
