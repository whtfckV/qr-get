// disput.ts

export type Disput = {
  // id: string
  partner: string
  succesful_payments: string
  total_sum_services: string
  disputs: string
  disputs_sum: string
  disputs_percents_by_things: string
  disputs_percent_by_sum: string
}

export type Disputs = {
  partners: Disput[]
  total: Disput
}
