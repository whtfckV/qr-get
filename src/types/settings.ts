export type reposrtsTypes =
  | "report_sales_returns"
  | "report_disput"
  | "report_profit";
export type tablesTypes =
  | "table_disput"
  | "table_verification_payments"
  | "table_dds";

export type Settings = {
  id: string;
} & Record<reposrtsTypes, boolean> &
  Record<tablesTypes, boolean>;

export type SettingsWithoutId = Omit<Settings, "id">;

export type updateSettings = Omit<Settings, "id">;

export type SelectSettings = {
  [key: string]: string[];
};
