import { getBalance } from "@/api/balance";
import { defineStore } from "pinia";

export const useBalanceStore = defineStore("balance", () => {
  const balance = ref<number>();
  const balancePlan = ref<number>();
  const isLoading = ref(false);

  const get = async () => {
    try {
      isLoading.value = true;
      const response = await getBalance();

      if (response.success) {
        balance.value = response.data.fact_sum;
        balancePlan.value = response.data.planned_sum;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log("Get Balance Error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    balance,
    balancePlan,
    isLoading,
    get,
  };
});
