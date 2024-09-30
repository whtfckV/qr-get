export enum Post {
  generation = 'content-generation/generate_test_by_query',
  login = '/auth/login',
  partners= '/sales_returns',
  profit = '/profit',
  disputs = '/disputs'
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

export type Methods = 'GET' | 'PUT' | 'POST'

export type Token = {
  access_token: string
  token_type: string
}
