import { defineStore } from "pinia";
import { getSalesGraphPoints } from "@/api/reports/graphs";
import {
  GraphOldStep,
  GraphStep,
  GraphType,
  Sales,
  SalesRequestBody,
} from "@/types/reports/graphs";
import moment from "moment";
import { useSalesReturnsStore } from "../reports/sales_return";

export const useSalesGraph = defineStore("salesGraph", () => {
  const graph = ref<Sales>([]);
  const oldGraph = ref<Sales>([]);
  const isLoading = ref(false);
  const error = ref("");
  const step = ref<GraphStep>("day");
  const type = ref<GraphType>("sum");
  const oldStep = ref<GraphOldStep>("month");

  const salesReturnsStore = useSalesReturnsStore();

  const createFilters = (old: boolean = false): SalesRequestBody => {
    let startDate = moment(salesReturnsStore.dates[0]).clone();
    let endDate = moment(salesReturnsStore.dates[1]).clone();

    if (old) {
      if (oldStep.value === "month") {
        startDate = startDate.subtract(1, 'month');
        endDate = endDate.subtract(1, 'month');
      } else if (oldStep.value === "year") {
        startDate = startDate.subtract(1, 'year');
        endDate = endDate.subtract(1, 'year');
      }
    }

    return {
      partners: salesReturnsStore.partners,
      customers: salesReturnsStore.customers,
      products: salesReturnsStore.products,
      date_start: startDate.format("YYYY-MM-DDTHH:mm"),
      date_end: endDate.format("YYYY-MM-DDTHH:mm"),
      step: step.value,
      type: type.value,
    };
  };

  const get = async () => {
    isLoading.value = true;
    try {
      await Promise.all([getSales(), getOldSales()]);
    } catch (error) {
      console.log("Get Sales Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getSales = async () => {
    try {
      const response = await getSalesGraphPoints(createFilters());
      if (response.success) {
        graph.value.splice(0);
        graph.value.push(...response.data);
      } else {
        error.value = response.details;
        throw response.error;
      }
    } catch (error) {
      console.log("Get Sales Graph Error:", error);
    }
  };

  const getOldSales = async () => {
    try {
      const response = await getSalesGraphPoints(createFilters(true));
      if (response.success) {
        oldGraph.value.splice(0);
        oldGraph.value.push(...response.data);
      } else {
        error.value = response.details;
        throw response.error;
      }
    } catch (error) {
      console.log("Get Sales Old Graph Error:", error);
    }
  };

  watch(oldStep,() => {
    getOldSales()
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
  };
});
