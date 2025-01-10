import { ApiError, ApiResponse } from "@/types/api";
import { DisputsBody, DisputsData, DisputStatus, DisputUpdateBody } from "@/types/disputs";
import { Api } from ".";
import { Get, Post, Put } from "./types";

export const getDisputs = async (body: DisputsBody): Promise<ApiResponse<DisputsData> | ApiError> =>
  Api.post<DisputsData>(Post.disputsTable, JSON.stringify(body))

export const updateDisput = async (id: string, body: DisputUpdateBody): Promise<ApiResponse<DisputsData> | ApiError> =>
  Api.put<DisputsData>(Put.updateDisput, JSON.stringify(body), id)

export const getDisputStatuses = async (): Promise<ApiResponse<DisputStatus[]> | ApiError> =>
  Api.get<DisputStatus[]>(Get.disputsStatuses)
