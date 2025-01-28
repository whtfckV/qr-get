import { OpiuFilters, OpiuResponse } from "@/types/opiu";
import { Api } from ".";
import { Post } from "./types";
import { ApiError, ApiResponse } from "@/types/api";

export const getOpiu = async (
  filters: OpiuFilters
): Promise<ApiResponse<OpiuResponse> | ApiError> => {
  return Api.post<OpiuResponse>(Post.opiu, JSON.stringify(filters));
};
