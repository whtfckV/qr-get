export type reposrtsTypes =
  | "report_sales_returns"
  | "report_disput"
  | "report_profit" | "table_disput";
export type tablesTypes = "table_disput";

export type Settings = {
  id: string;
} & Record<reposrtsTypes, boolean> &
  Record<tablesTypes, boolean>;

export type SettingsWithoutId = Omit<Settings, "id">;

export type updateSettings = Record<reposrtsTypes, boolean>;

export type SelectSettings = {
  [key: string]: string[];
};
