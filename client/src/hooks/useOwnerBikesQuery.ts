import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { BikeModelType } from "../assets/assets";

export const useOwnerBikesQuery = () => {
  return useQuery<BikeModelType[]>({
    queryKey: ["owner-bikes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/owner/my-listing");

      if (!Array.isArray(data.bikes)) {
        throw new Error("Invalid response: bikes is not an array");
      }

      return data.bikes;
    },
  });
};
