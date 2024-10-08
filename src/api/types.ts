export enum Post {
  generation = 'content-generation/generate_test_by_query',
  login = '/auth/login',
  register = '/auth/register',
  partners= '/sales_returns',
  profit = '/profit',
  disputs = '/disputs',
}

export enum Get {
  users = '/user/get_all_users_with_settings',
  refresh = '/auth/refresh',
  customers = '/filters/customers',
  partners = '/filters/partners',
  products = '/filters/products'
}

export enum Put {
  updateUserSettings = '/settings'
}

export enum Delete {
  user = '/user'
}

export enum Graphs {
  sales = '/sales_returns/graphs',
  profits = '/profit/graphs',
  disputs = '/disputs/graphs',
}

export type Methods = 'GET' | 'PUT' | 'POST' | 'DELETE'

export type Token = {
  access_token: string
  token_type: string
}
