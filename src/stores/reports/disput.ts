import { defineStore } from "pinia";
import type { Disput } from "@/types/reports/disput";
import { getDisputsReport } from "@/api/reports/reports";
import moment from "moment";
import { useDisputsGraph } from "../graphs/disputs";
// import { fillMonth } from "@/utils/fillDates";

export const useDisputsStore = defineStore("disput", () => {
  const disputs = reactive<Disput[]>([]);
  const isLoading = ref(false);
  const error = ref();

  const partners = ref<string[]>([]);
  const products = ref<string[]>([]);

  const today = new Date();
  today.setHours(23, 59);
  const dates = ref<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), 1),
    today,
  ]);

  const disputsGraphStore = useDisputsGraph();

  const getDisputs = async () => {
    if (!disputs.length) {
      isLoading.value = true;
    }

    const filters = {
      partners: partners.value,
      products: products.value,
      date_start: moment(dates.value[0]).format("YYYY-MM-DDTHH:mm"),
      date_end: moment(dates.value[1]).format("YYYY-MM-DDTHH:mm"),
    };

    try {
      const response = await getDisputsReport(filters);

      if (response.success) {
        disputs.splice(0);
        disputs.push(...response.data.partners, response.data.total);
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
    getDisputs();
    disputsGraphStore.get();
  });

  return {
    disputs,
    products,
    partners,
    dates,
    getDisputs,
  };
});
