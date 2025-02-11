import { Category } from "./dds";

export type OpiuFilters = {
  date_start: string;
  date_end: string;
  partners: string[];
  customers: string[];
};

type CostPrice = {
  name: string;
  sum: string;
  categories: Category[];
}

type OperatingExpenses = {
  sum: string;
  groups: ExpenseGroup[];
}

type ExpenseGroup = {
  name: string;
  sum: string;
  categories: Category[];
}

export type OpiuResponse = {
  revenue_sum: string;
  cost_price_sum: CostPrice;
  gross_profit_sum: string;
  operating_expenses: OperatingExpenses;
  net_profit: string;
};
