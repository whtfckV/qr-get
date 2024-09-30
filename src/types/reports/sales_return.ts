export type SellersReturn = {
  id?: number
  sector_id: number
  sector_name: string
  cert_number: string
  order_id: number
  order_partner_id: number
  datetime_msk: string
  fio: string
  passport_info: string
  birthday: string
  email: string
  phone: string
  packet_dz: number
  sum: number
  card: string
  date_contract_create: string
  date_start_insurance: string
  date_end_insurance: string
  insurance_sum: number
  commision_acquiring: number
  partner_bonus: number
  insurance_bonus: number
  service_bonus: number
  netto_qrget: number
  date_application_termination: string
  date_termination: string
  disput: boolean,
  type: 'sell' | 'return'
}
