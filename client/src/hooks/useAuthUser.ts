import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";

export const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/user/me");
        return data;
      } catch (error: any) {
        console.log("Error in UseAuthUser", error);
        return null;
      }
    },
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
