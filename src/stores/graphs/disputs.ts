import { defineStore } from "pinia";
import { getDisputsGraphPoints } from "@/api/reports/graphs";
import {
  Disputs,
  DisputsRequestBody,
  GraphOldStep,
  GraphStep,
  GraphType,
} from "@/types/reports/graphs";
import moment from "moment";
import { useDisputsStore } from "../reports/disput";

export const useDisputsGraph = defineStore("DisputsGraph", () => {
  const graph = ref<Disputs>([]);
  const oldGraph = ref<Disputs>([]);
  const isLoading = ref(false);
  const error = ref("");
  const step = ref<GraphStep>("day");
  const type = ref<GraphType>("sum");
  const oldStep = ref<GraphOldStep>('month')

  const disputStore = useDisputsStore();

  const createFilters = (old: boolean = false): DisputsRequestBody => {
    let startDate = moment(disputStore.dates[0]).clone();
    let endDate = moment(disputStore.dates[1]).clone();

    if (old) {
      if (oldStep.value === "month") {
        startDate = startDate.subtract(1, "month");
        endDate = endDate.subtract(1, "month");
      } else if (oldStep.value === "year") {
        startDate = startDate.subtract(1, "year");
        endDate = endDate.subtract(1, "year");
      }
    }
    return {
      partners: disputStore.partners,
      products: disputStore.products,
      date_start: startDate.format('YYYY-MM-DDTHH:mm'),
      date_end: endDate.format('YYYY-MM-DDTHH:mm'),
      step: step.value,
      type: type.value,
    };
  };

  const get = async () => {
    isLoading.value = true;
    try {
      await Promise.all([getDisputs(), getDisputsOld()]);
    } catch (error) {
      console.log("Get Profit Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  }

  const getDisputs = async () => {
    isLoading.value = true;
    try {
      const response = await getDisputsGraphPoints(createFilters());

      if (response.success) {
        graph.value.splice(0);
        graph.value.push(...response.data);
      } else {
        error.value = response.details;
        throw response.error;
      }
    } catch (error) {
      console.log("Get Profit Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  };
  const getDisputsOld = async () => {
    isLoading.value = true;
    try {
      const response = await getDisputsGraphPoints(createFilters(true));

      if (response.success) {
        oldGraph.value.splice(0);
        oldGraph.value.push(...response.data);
      } else {
        error.value = response.details;
        throw response.error;
      }
    } catch (error) {
      console.log("Get Profit Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(oldStep,() => {
    getDisputsOld()
  })

  watch([step, type], () => {
    get();
  });

  return {
    graph,
    oldGraph,
    step,
    oldStep,
    type,
    get,
    getDisputs,
    getDisputsOld
  };
});
