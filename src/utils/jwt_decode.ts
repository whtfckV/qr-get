// import type { tJwtTokenDecode } from "@/types/auth";
import VueJwtDecode from 'vue-jwt-decode'

export type tJwtTokenDecode = {
  fio: string,
  username: string,
  role: string,
}

export const jwtDecode = (token: string | null): tJwtTokenDecode => token ? VueJwtDecode.decode(token) : undefined
