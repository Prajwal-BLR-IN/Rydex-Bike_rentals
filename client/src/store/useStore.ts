import { create } from "zustand";

type StoreType = {
  pickupDate: string;
  returnDate: string;
  setPickupDate: (pickupDate: string) => void;
  setReturnDate: (returnDate: string) => void;
};

export const useStore = create<StoreType>((set) => ({
  pickupDate: "",
  returnDate: "",
  setPickupDate: (pickupDate) => set({ pickupDate }),
  setReturnDate: (returnDate) => set({ returnDate }),
}));
