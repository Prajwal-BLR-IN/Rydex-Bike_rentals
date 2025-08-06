import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { BookingType } from "../assets/assets";

export const useMyBookingQuery = () => {
  return useQuery<BookingType[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/bookings/my-booking");

      if (!Array.isArray(data.bookings)) {
        throw new Error("Invalid response: bookings is not an array");
      }

      return data.bookings;
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
};
