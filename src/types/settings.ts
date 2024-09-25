export type Settings = {
  id: string,
  report_sales_returns: boolean,
  report_disput: boolean,
  report_profit: boolean
}

export type SelectSettings = {
  [key: string]: string[]
}
