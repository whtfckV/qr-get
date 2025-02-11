export type DdsFilters = {
  date_start: string;
  date_end: string;
  partners: string[];
  customers: string[];
};

export type Category = {
  name: string;
  sum: string;
}

export type DdsResponse = {
  start_balance: string;
  incoming_sum: string;
  outcomings: {
    sum: string;
    categories: Category[];
  };
  final_balance: string;
};
