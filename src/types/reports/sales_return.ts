export type SellersReturn = {
  id?: number
  // sector_id: number
  // order_id: number
  // order_partner_id: number
  sector_name: string //
  cert_number: string //
  datetime_msk: string //
  fio: string //
  passport_info: string //
  birthday: string //
  email: string //
  phone: string //
  packet_dz: number //
  price: number //
  card: string //
  date_contract_create: string //
  date_start_insurance: string //
  date_end_insurance: string //
  insurance_sum: number //
  commision_acquiring: number //
  partner_bonus: number //
  insurance_bonus: number //
  service_bonus: number //
  netto_qrget: number //
  date_application_termination: string //
  date_termination: string //
  disput: boolean, //
  type: 'sell' | 'return' //
}

export type ReportType = 'sell' | 'retern'
export type SalesReturnsFilters = {
  partners: string[];
  products: string[];
  customers: string[];
  dates: Date[];
  type: ReportType;
}
