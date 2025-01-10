import { defineStore } from "pinia";
import type { Partner } from "@/types/reports/profit";
import { getProfitsReport } from "@/api/reports/reports";
import moment from "moment";
import { useProfitsGraph } from "../graphs/profits";
import { fillMonth } from "@/utils/fillDates";

export const useProfitStore = defineStore("profit", () => {
  const profits = reactive<Partner[]>([]);
  const isLoading = ref(false);
  const error = ref();
  const partners = ref<string[]>([]);
  const dates = ref<Date[]>(fillMonth());

  const profitDisputsGraph = useProfitsGraph();

  const getProfits = async () => {
    isLoading.value = true;

    const start = dates.value[0];
    const end = dates.value.at(-1);

    const filters = {
      partners: partners.value,
      date_start: moment(start).format("YYYY-MM-DD"),
      date_end: moment(end).format("YYYY-MM-DD"),
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
