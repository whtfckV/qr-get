import { SelectSettings } from "@/types/settings";
import { Users } from "@/types/users";
import { defineStore } from "pinia";

const MockUsers: Users = [
  {
    id: "806a3a9a-eaed-4cae-933c-b5b368ed44e7",
    username: "test",
    surname: "test",
    name: "test",
    patronymic: "test",
    role: "user",
    is_archived: false,
    settings: {
      id: "dick",
      report_sales_returns: true,
      report_disput: true,
      report_profit: true,
    },
  },
  {
    id: "0d8cbe7e-ff5e-4c69-bcc4-39670ca163e0",
    username: "test1",
    surname: "test1",
    name: "test1",
    patronymic: "test1",
    role: "user",
    is_archived: false,
    settings: {
      id: "pick",
      report_sales_returns: true,
      report_disput: false,
      report_profit: false,
    },
  },
  {
    id: "39b92777-d392-46d0-ac5f-6567bac78bd7",
    username: "alinir",
    surname: "Богданова",
    name: "Алина",
    patronymic: "Сергеевна",
    role: "user",
    is_archived: false,
    settings: {
      id: "suck",
      report_sales_returns: true,
      report_disput: true,
      report_profit: true,
    },
  },
];

export const useUsersStore = defineStore("users", () => {
  const users = reactive<Users>(MockUsers);
  // console.log(users.map(user => ({id: user.id, settings: Object.entries(user.settings)})))
  const settings = ref<SelectSettings>({});
  users.forEach((user) => {
    settings.value.push({
    id: user.id,
    settings: Object.entries(user.settings)
      .map(([setting, bool]) =>
        typeof bool === "boolean" && bool ? setting : ""
      )
      .filter((settings) => settings),
  });

  console.log(settings.value);

  return {
    users,
    settings,
  };
});
