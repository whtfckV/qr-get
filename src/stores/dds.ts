import { getDds } from "@/api/dds";
import { Category, DdsFilters } from "@/types/dds";
import { fillMonth } from "@/utils/fillDates";
import moment from "moment";
import { defineStore } from "pinia";

export const useDDSStore = defineStore("dds", () => {
  const isLoading = ref(false);
  const dates = ref<Date[]>(fillMonth());
  const partners = ref<string[]>([]);
  const customers = ref<string[]>([]);
  const categories = ref<Category[]>([]);
  const startBalance = ref<string>("");
  const incomingSum = ref<string>("");
  const outcomingsSum = ref<string>("");
  const finalBalance = ref<string>("");

  const createFilters = (): DdsFilters => {
    const start = dates.value[0];
    const end = dates.value.at(-1);

    return {
      date_start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
      date_end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
      partners: partners.value,
      customers: customers.value,
    };
  };

  const get = async () => {
    try {
      isLoading.value = true;
      const response = await getDds(createFilters());
      if (response.success) {
        categories.value.splice(0);
        categories.value.push(...response.data.outcomings.categories);
        startBalance.value = response.data.start_balance;
        incomingSum.value = response.data.incoming_sum;
        outcomingsSum.value = response.data.outcomings.sum;
        finalBalance.value = response.data.final_balance;
        [
          { name: "Начальный остаток", sum: response.data.start_balance },
          { name: "Приход", sum: response.data.incoming_sum },
          { name: "Расход", sum: response.data.outcomings.sum },
          ...response.data.outcomings.categories,
          { name: "Конечный остаток", sum: response.data.final_balance },
        ];
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(dates, () => {
    get();
  });

  return {
    isLoading,
    dates,
    partners,
    customers,
    categories,
    startBalance,
    incomingSum,
    outcomingsSum,
    finalBalance,
    get,
  };
});
