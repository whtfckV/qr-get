import { defineStore } from "pinia";
import { jwtDecode, tJwtTokenDecode } from "@/utils/jwt_decode";
import { getUserSettings } from "@/api/users";
import { SettingsWithoutId } from "@/types/settings";

export const useUserStore = defineStore("user", () => {
  const user = ref<tJwtTokenDecode>();
  const settings = ref<Omit<SettingsWithoutId, 'report_sales_returns_excel'>>();
  const settingsExcel = ref(false);


  const getUserInfo = async () => {
    user.value = jwtDecode(localStorage.getItem("authToken"));
  };

  const getSettings = async () => {
    if (!user.value) return;
    try {
      const response = await getUserSettings(user.value.sub);
      if (response.success) {
        settingsExcel.value = response.data.report_sales_returns_excel
        const { id, report_sales_returns_excel, ...settignsWithoutId } = response.data;
        // console.log(response.data)
        settings.value = settignsWithoutId;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    settings,
    settingsExcel,
    getUserInfo,
    getSettings,
  };
});
