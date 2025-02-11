import { ExpenseCategory } from "@/types/expenses";

export type Props = {
  category: ExpenseCategory;
};

export type Emit = {
  (e: "update", category: { id: string; name: string }): void;
  (e: "archive", id: string): void;
  (e: "add", id: string, name: string): void;
};
