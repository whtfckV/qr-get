export type Balance = {
  organization_name: string;
  fact_sum: number;
  planned_sum: number;
};

export type PaymentBody = {
  moment: string,
  sum: number
}

export type Payment = {
  id: number,
  moment: string,
  sum: number,
  created_at: string
}
