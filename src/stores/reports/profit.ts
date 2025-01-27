import { defineStore } from "pinia";
import type { Partner } from "@/types/reports/profit";
import { getProfitsReport } from "@/api/reports/reports";
import moment from "moment";
import { useProfitsGraph } from "../graphs/profits";

// const filters = {
//   partners: [
//     'b9c64d47-6f70-4084-8012-b33f8d4cc4cc',
//     '236fb7ff-bb24-4966-b6a7-b8fdc145f45c',
//   ],
//   customers: [
//     '410ff829-a8cf-4430-a887-0cc69dd25747',
//   ],
//   products: [
//     '743bf09e-373b-4f0f-9816-dd679f733250',
//   ],
//   date_start: '2024-08-26',
//   date_end: '2024-09-25',
//   type: 'sell',
// }

export const useProfitStore = defineStore("profit", () => {
  const profits = reactive<Partner[]>([]);
  const isLoading = ref(false);
  const error = ref();
  const partners = ref<string[]>([]);

  const today = new Date();
  today.setHours(23, 59);

  const dates = ref<[Date, Date]>([
    new Date(today.getFullYear(), today.getMonth(), 1),
    today,
  ]);

  const profitDisputsGraph = useProfitsGraph();

  const getProfits = async () => {
    isLoading.value = true;

    const filters = {
      partners: partners.value,
      date_start: moment(dates.value[0]).format("YYYY-MM-DDTHH:mm"),
      date_end: moment(dates.value[1]).format("YYYY-MM-DDTHH:mm"),
    };

    try {
      const response = await getProfitsReport(filters);

      if (response.success) {
        profits.splice(0);
        profits.push(
          ...response.data.partners,
          response.data.total
        );
      } else {
        error.value = response.error;
      }
    } catch (error) {
      console.log("Get partners error: " + error);
    } finally {
      isLoading.value = false;
    }
  };
  watch(dates, () => {
    getProfits();
    profitDisputsGraph.get();
  });

  return {
    profits,
    partners,
    dates,
    isLoading,
    getProfits,
  };
});
