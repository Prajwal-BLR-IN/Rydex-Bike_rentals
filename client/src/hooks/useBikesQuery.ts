import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { BikeModelType } from "../assets/assets";

export const useBikesQuery = () => {
  return useQuery<BikeModelType[]>({
    queryKey: ["bikes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/bikes");

      if (!Array.isArray(data.allAvailableBikes)) {
        throw new Error("Invalid response: bikes is not an array");
      }

      return data.allAvailableBikes;
    },
  });
};
