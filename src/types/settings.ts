export type Settings = {
  [key: string]: boolean | string;
  id: string;
  report_sales_returns: boolean;
  report_disput: boolean;
  report_profit: boolean;
};

export type updateSettings = {
  report_sales_returns: boolean;
  report_disput: boolean;
  report_profit: boolean;
};

export type SelectSettings = {
  [key: string]: string[];
};
