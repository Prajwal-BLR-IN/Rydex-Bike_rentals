import { axiosInstance } from "../helper/axiosInstance";

export const fetchAllAvailableBikes = async () => {
  const res = await axiosInstance.get("/bikes");
  return res.data.allAvailableBikes;
};
