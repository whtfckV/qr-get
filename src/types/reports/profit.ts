// disput.ts

export type Partner = {
  // id: string
  partner: string;
  succesful_payments: number
  averange_sum_services:number
  total_sum_services:number
  sum_reward_p2b:number
  returns_amount:number
  returns_sum:number
  returns_percent_by_things:number
  returns_percent_by_money:number
  service_bonus_sum: number
  insurance_bonus_sum: number
  // service_sum_minus_rewards:number
  total_partner_reward:number
  total_sum_rewards_d2:number
  total_sum_reward_d3:number
  profit_before_taxes:number
}

export type Profit = {
  partners: Partner[],
  total: Partner
}
