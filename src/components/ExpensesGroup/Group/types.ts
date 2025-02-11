import { ExpenseGroup } from "@/types/expenses";

export type Props = {
  group: ExpenseGroup;
};

export type Emits = {
  "delete:group": [id: string];
};
