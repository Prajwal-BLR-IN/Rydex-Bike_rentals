// Zustand Store

import { create } from "zustand";

type BikeFilterState = {
  searchText: string;
  selectedLocation: string;
  sortBy: "default" | "price-asc" | "price-desc";
  setSearchText: (text: string) => void;
  setSelectedLocation: (location: string) => void;
  setSortBy: (sort: "default" | "price-asc" | "price-desc") => void;
};

export const useBikeFilterStore = create<BikeFilterState>((set) => ({
  searchText: "",
  selectedLocation: "",
  sortBy: "default",
  setSearchText: (text) => set({ searchText: text }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));
