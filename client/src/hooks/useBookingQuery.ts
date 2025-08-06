import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { BookingType } from "../assets/assets";

export const useBookingQuery = () => {
  return useQuery<BookingType[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/bookings/owner");

      if (!Array.isArray(data.bookings)) {
        throw new Error("Invalid response: bookings is not an array");
      }

      return data.bookings;
    },
  });
};
