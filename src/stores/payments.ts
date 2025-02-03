import { getPayments } from "@/api/payments";
import { Payment } from "@/types/payments";
import { PaymentFilters } from "@/types/payments";
import { fillMonth } from "@/utils/fillDates";
import moment from "moment";
import { defineStore } from "pinia";

export const usePaymentsStore = defineStore("payments", () => {
  const isLoading = ref(false);
  const payments = ref<Payment[]>([]);
  const dates = ref<Date[]>(fillMonth());

  const get = async () => {
    const start = dates.value[0];
    const end = dates.value.at(-1);

    const filters: PaymentFilters = {
      date_start: moment(start).format("YYYY-MM-DD"),
      date_end: moment(end).format("YYYY-MM-DD"),
    };

    try {
      isLoading.value = true;
      const response = await getPayments(filters);
      if (response.success) {
        payments.value.splice(0)
        payments.value.push(...response.data);
      }
    } catch (error) {
      console.log(error)
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
    payments,
    get,
  };
});
