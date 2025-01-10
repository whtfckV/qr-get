import { getDisputs, getDisputStatuses, updateDisput } from "@/api/disputs";
import {
  DisputsBody,
  DisputStatus,
  DisputTable,
  DisputUpdateBody,
} from "@/types/disputs";
import { fillMonth } from "@/utils/fillDates";
import moment from "moment";
import { defineStore } from "pinia";

export const useDisputsTableStore = defineStore("disputs", () => {
  const data = reactive<DisputTable[]>([]);
  const dates = ref<Date[]>(fillMonth());
  const partners = ref<string[]>([]);
  const customers = ref<string[]>([]);

  //---filters----//
  const status = ref<string[]>([]);
  const statuses = ref<DisputStatus[]>([]);

  //---pagination---//
  const limit = ref(100);
  const size = ref(0);
  const page = ref(1);

  //---loading---//
  const isLoading = ref(false);

  const get = async () => {
    const start = dates.value[0];
    const end = dates.value.at(-1);

    const filters: DisputsBody = {
      partners: partners.value,
      customers: customers.value,
      statuses: status.value,
      date_start: moment(start).format("YYYY-MM-DD"),
      date_end: moment(end).format("YYYY-MM-DD"),
      limit: limit.value,
      offset: page.value * limit.value,
    };

    try {
      isLoading.value = true;
      const response = await getDisputs(filters);

      if (response.success) {
        data.splice(0);
        data.push(...response.data.data);
        size.value = response.data.size;
        limit.value = response.data.limit;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Get Profit Graph Error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getStatuses = async () => {
    try {
      const response = await getDisputStatuses();
      if (response.success) {
        statuses.value = response.data;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Get Disputs Statuses Error:", error);
    }
  };

  const updateDisputInfo = async (id: string) => {
    const body: DisputUpdateBody = {
      description: data.find((disput) => disput.id === id)?.description,
      status: data.find((disput) => disput.id === id)?.status,
    };
    try {
      const response = await updateDisput(id, body);
      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Update Disput Error", error);
    }
  };

  watch([dates], () => {
    get();
  });

  return {
    dates,
    partners,
    customers,
    status,
    statuses,
    data,
    isLoading,
    limit,
    page,
    size,
    get,
    getStatuses,
    updateDisputInfo,
  };
});
