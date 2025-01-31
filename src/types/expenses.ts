export type ExpenseCategory = {
  id: string
  name: string
}

export type ExpenseGroup = {
  id: string
  name: string
  items: ExpenseCategory[]
}

export type ExpenseBody = {
  category_id: string,
  dds_moment: string,
  opiu_moment: string,
  sum: number
}

export type Expense = {
  id: string,
  category_name: string,
  moment: string,
  sum: number,
  created_at: string
}
