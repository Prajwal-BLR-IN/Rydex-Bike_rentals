import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import toast from "react-hot-toast";

type parameterType = {
  url: string;
  onSuccessRedirect?: () => void;
  invalidateKey: string;
};

type AuthPayload = {
  profilePicture?: File;
  name?: string;
  email: string;
  password: string;
};

type payloadData = AuthPayload | null | any;

type ResponseData = {
  success: boolean;
  message: string;
  user?: any;
};

export const useAuthMutation = ({
  url,
  onSuccessRedirect,
  invalidateKey,
}: parameterType) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, any, payloadData>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(url, payload);
      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        throw new Error(data.message || "Request failed");
      }
    },
    onSuccess: async () => {
      if (invalidateKey) {
        await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
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
