import { ApiError, ApiResponse } from "@/types/api";
import { DdsFilters, DdsResponse } from "@/types/dds";
import { Api } from ".";
import { Post } from "./types";

export const getDds = async (filters: DdsFilters): Promise<ApiResponse<DdsResponse> | ApiError> =>
  Api.post<DdsResponse>(Post.dds, JSON.stringify(filters))
