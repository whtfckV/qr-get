export type Balance = {
  organization_name: string;
  fact_sum: number;
  planned_sum: number;
};

export type PaymentBody = {
  dds_moment: string,
  opiu_moment: string,
  sum: number
}

export type Payment = {
  id: number,
  moment: string,
  sum: number,
  created_at: string
}
