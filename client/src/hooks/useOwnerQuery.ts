import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";

export const useOwnerQuery = () => {
  const ownerData = useQuery({
    queryKey: ["owner"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/owner/dashboard");
        return data;
      } catch (error: any) {
        console.log("Error in useOwnerQuery", error);
        return null;
      }
    },
    retry: false,
  });

  return {
    isLoading: ownerData.isLoading,
    ownerData: ownerData.data,
  };
};
