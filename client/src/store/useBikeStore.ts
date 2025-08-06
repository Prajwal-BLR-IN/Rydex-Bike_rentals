import { create } from "zustand";
import { axiosInstance } from "../helper/axiosInstance";
import { type BikeModelType } from "../assets/assets";

type BikeStore = {
  bikes: BikeModelType[];
  loading: boolean;
  error: string | null;
  fetchBikes: () => Promise<void>;
};

export const useBikeStore = create<BikeStore>((set) => ({
  bikes: [],
  loading: false,
  error: null,
  fetchBikes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/bikes");
      set({ bikes: res.data.allAvailableBikes, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch bikes", loading: false });
    }
  },
}));
