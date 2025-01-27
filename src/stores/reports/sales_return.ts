import { defineStore } from "pinia";
import type { ReportType, SellersReturn } from "@/types/reports/sales_return";
import { getSalesReturnsReport } from "@/api/reports/reports";
import moment from "moment";
import { useSalesGraph } from "../graphs/sales";

export const useSalesReturnsStore = defineStore("partner", () => {
  const data = reactive<SellersReturn[]>([]);
  const size = ref(0);
  const limit = ref(10);
  const page = ref(0);
  const isLoading = ref(false);
  const error = ref();
  // filters
  const partners = ref<string[]>([]);
  const products = ref<string[]>([]);
  const customers = ref<string[]>([]);
  const type = ref<ReportType>("sell");

  const today = new Date();
  today.setHours(23, 59);

  const dates = ref<[Date, Date]>([
    new Date(today.getFullYear(), today.getMonth(), 1),
    today,
  ]);


  const salesGraphStore = useSalesGraph();

  const getPartners = async () => {
    isLoading.value = true;

    const filters = {
      partners: partners.value,
      customers: customers.value,
      products: products.value,
      type: type.value,
      date_start: moment(dates.value[0]).format("YYYY-MM-DDTHH:mm"),
      date_end: moment(dates.value[1]).format("YYYY-MM-DDTHH:mm"),
      limit: limit.value,
      offset: page.value * limit.value,
    };

    try {
      const response = await getSalesReturnsReport(filters);

      if (response.success) {
        data.splice(0);
        data.push(...response.data.data);
        size.value = response.data.size;
        limit.value = response.data.limit;
      } else {
        error.value = response.error;
      }
    } catch (error) {
      console.log("Get partners error: " + error);
    } finally {
      isLoading.value = false;
    }
  };

  const setLimit = (newLimit: number) => {
    page.value = 0;
    limit.value = newLimit;
  };
  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  watch([dates, type], () => {
    getPartners();
    salesGraphStore.get();
  });

  return {
    data,
    partners,
    products,
    customers,
    dates,
    type,
    size,
    page,
    limit,
    isLoading,
    getPartners,
    setLimit,
    setPage,
  };
});
