import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import toast from "react-hot-toast";

type parameterType = {
  url: string;
  onSuccessRedirect?: () => void;
  invalidateKey: string;
  invalidateKey2?: string;
};

type payloadData = null | any;

type ResponseData = {
  success: boolean;
  message: string;
  user?: any;
};

export const useOwnerMutation = ({
  url,
  onSuccessRedirect,
  invalidateKey,
  invalidateKey2,
}: parameterType) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, any, payloadData>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(url, payload);
      if (data.success) {
        data.message && toast.success(data.message);
        return data;
      } else {
        throw new Error(data.message || "Request failed");
      }
    },
    onSuccess: async () => {
      if (invalidateKey) {
        await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
      if (invalidateKey2) {
        await queryClient.invalidateQueries({ queryKey: [invalidateKey2] });
      }
      if (onSuccessRedirect) onSuccessRedirect();
    },
    onError: (error) => {
      const backendMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(backendMessage);
    },
  });
};
