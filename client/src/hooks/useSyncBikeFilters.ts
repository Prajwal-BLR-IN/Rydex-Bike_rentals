import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBikeFilterStore } from "../store/useBikeFilterStore";

export const useSyncBikeFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    searchText,
    selectedLocation,
    sortBy,
    setSearchText,
    setSelectedLocation,
    setSortBy,
  } = useBikeFilterStore();

  // Read from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchText(params.get("search") || "");
    setSelectedLocation(params.get("location") || "");
    setSortBy((params.get("sort") as any) || "default");
  }, []);

  // Update URL when Zustand values change, preserving extra params
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);

    // Set/overwrite Zustand-managed filters
    if (searchText) {
      currentParams.set("search", searchText);
    } else {
      currentParams.delete("search");
    }

    if (selectedLocation) {
      currentParams.set("location", selectedLocation);
    } else {
      currentParams.delete("location");
    }

    if (sortBy && sortBy !== "default") {
      currentParams.set("sort", sortBy);
    } else {
      currentParams.delete("sort");
    }

    navigate(`?${currentParams.toString()}`, { replace: true });
  }, [searchText, selectedLocation, sortBy]);
};
