export type ExpenseCategory = {
  id: string
  name: string
}

export type ExpensesGroup = {
  id: string
  name: string
  items: ExpenseCategory[]
}

export type ExpenseBody = {
  category_id: string,
  moment: string,
  sum: number
}

export type Expense = {
  id: string,
  category_name: string,
  moment: string,
  sum: number,
  created_at: string
}
