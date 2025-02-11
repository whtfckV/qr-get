import { getOpiu } from "@/api/opiu";
import { OpiuFilters, OpiuResponse } from "@/types/opiu";
import moment from "moment";
import { defineStore } from "pinia";

export const useOpiuStore = defineStore("opiu", () => {
  const isLoading = ref(false);
  // filters
  const partners = ref<string[]>([]);
  const customers = ref<string[]>([]);

  const today = new Date();
  today.setHours(23, 59, 59);
  const dates = ref<[Date, Date]>([
    new Date(today.getFullYear(), today.getMonth(), 1),
    today,
  ]);
  // data
  const data = ref<OpiuResponse>({
    revenue_sum: "",
    cost_price_sum: {
      categories: [],
      name: "",
      sum: "",
    },
    gross_profit_sum: "",
    operating_expenses: {
      sum: "",
      groups: [],
    },
    net_profit: "",
  });

  const createFilters = (): OpiuFilters => {
    return {
      date_start: moment(dates.value[0]).format("YYYY-MM-DD"),
      date_end: moment(dates.value[1]).format("YYYY-MM-DD"),
      partners: partners.value,
      customers: customers.value,
    };
  };

  const get = async () => {
    try {
      isLoading.value = true;
      const response = await getOpiu(createFilters());

      if (response.success) {
        data.value = response.data;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Get Opiu Error:", error);
      }
    } finally {
      isLoading.value = false;
    }
  };

  watch(dates, () => {
    get();
  })

  return {
    isLoading,
    dates,
    partners,
    customers,
    data,
    get,
  };
});
