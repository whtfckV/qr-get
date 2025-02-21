export enum Post {
  generation = 'content-generation/generate_test_by_query',
  login = '/auth/login',
  register = '/auth/register',
  partners = '/sales_returns',
  profit = '/profit',
  disputs = '/disputs',
  disputsTable = '/disputs/table',
  addPayment = '/verification_payments',
  addExpense = '/v1/operating_expenses',
  addExpenseCategory = '/v1/expenses_category',
  payments = '/verification_payments/table',
  dds = '/v1/dds/table',
  opiu = '/v1/opiu/table',
  addGroup = '/v1/expenses_group',
  addExpenseInGroup = '/v1/expenses_group_items',
  getExelReturns = '/sales_returns/excel',
}

export enum Get {
  users = '/user/get_all_users_with_settings',
  refresh = '/auth/refresh',
  customers = '/filters/customers',
  partners = '/filters/partners',
  products = '/filters/products',
  userSettings = '/settings',
  disputsStatuses = '/disputs/statuses',
  balance = '/organization_balance',
  categories = '/v1/expenses_category/all',
  groupsWithItems = '/v1/expenses_group/with_items',
  groups = '/v1/expenses_group',
}

export enum Put {
  updateUserSettings = '/settings',
  updateDisput = '/disputs',
  updateExpense = '/v1/expenses_category',
  moveExpenseToGroup = '/v1/expenses_group_items/move_to'
}

export enum Delete {
  user = '/user',
  expense = '/v1/expenses_category',
  expensesInGroup = '/v1/expenses_group_items',
  group = '/v1/expenses_group',
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
