import { defineStore } from "pinia";
import { jwtDecode, tJwtTokenDecode } from "@/utils/jwt_decode";
import { getUserSettings } from "@/api/users";
import { Settings } from "@/types/settings";

export const useUserStore = defineStore("user", () => {
  const user = ref<tJwtTokenDecode>();
  const settings = ref<Settings>();

  const getUserInfo = async () => {
    user.value = jwtDecode(localStorage.getItem("authToken"));
  };

  const getSettings = async () => {
    if (!user.value) return
    const response = await getUserSettings(user.value.sub);
    if (response.success) {
      settings.value = response.data;
    }
    try {
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
