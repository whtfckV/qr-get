export enum DisputStatus {
  CANCELLED = "Диспут списан банком эмитентом",
  RETURNED = "Диспут возвращён",
}
export type DisputTable = {
  row_number: number;
  id: string;
  partner_name: string;
  cert_number: string;
  datetime_msk: string;
  fio: string;
  email: string;
  phone: string;
  sum: string;
  status: DisputStatus;
  description: string;
};

export type DisputsData = {
  data: DisputTable[];
  size: number;
  limit: number;
  offset: number;
};

export type DisputsBody = {
  partners: string[];
  customers: string[];
  statuses: string[];
  date_start: string;
  date_end: string;
  limit: number;
  offset: number;
};

export type DisputUpdateBody = {
  status?: DisputStatus;
  description?: string;
}
