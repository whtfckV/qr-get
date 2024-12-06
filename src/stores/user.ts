import { defineStore } from "pinia";
import { jwtDecode, tJwtTokenDecode } from "@/utils/jwt_decode";
import { getUserSettings } from "@/api/users";
import { SettingsWithoutId } from "@/types/settings";

export const useUserStore = defineStore("user", () => {
  const user = ref<tJwtTokenDecode>();
  const settings = ref<SettingsWithoutId >();

  const getUserInfo = async () => {
    user.value = jwtDecode(localStorage.getItem("authToken"));
  };

  const getSettings = async () => {
    if (!user.value || settings.value) return;
    try {
      const response = await getUserSettings(user.value.sub);
      if (response.success) {
        const {id, ...settignsWithoutId} = response.data
        settings.value = settignsWithoutId;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    settings,
    getUserInfo,
    getSettings,
  };
});
