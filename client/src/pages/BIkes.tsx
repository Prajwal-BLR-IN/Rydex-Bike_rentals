import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, type BikeModelType } from "../assets/assets";
import BikeCard from "../components/BikeCard";
import { useBikesQuery } from "../hooks/useBikesQuery";
import { useSearchParams } from "react-router-dom";
import { useOwnerMutation } from "../hooks/useOwnerMutation";

const Bikes = () => {
  const [input, setInput] = useState("");
  const { data: bikeData = [] } = useBikesQuery();
  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filterBikes, setFilterBikes] = useState<BikeModelType[]>([]);

  const { mutate: checkAvailabilityMutation, data } = useOwnerMutation({
    url: "/bookings/check-availability",
    invalidateKey: "owner",
  });

  // Trigger the availability check when search params exist
  useEffect(() => {
    if (isSearchData) {
      checkAvailabilityMutation({
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
    }
  }, [pickupLocation, pickupDate, returnDate]);

  // Filter logic: input + availableBikes (if search) OR all bikes (if no search)
  useEffect(() => {
    const bikes =
      isSearchData && data && "availableBikes" in data
        ? (data as { availableBikes: BikeModelType[] }).availableBikes
        : bikeData;

    const filtered = bikes.filter(
      (bike) =>
        bike.brand.toLowerCase().includes(input.toLowerCase()) ||
        bike.bikeModel.toLowerCase().includes(input.toLowerCase()) ||
        bike.category.toLowerCase().includes(input.toLowerCase()) ||
        bike.fuel_type.toLowerCase().includes(input.toLowerCase()) ||
        bike.location.toLowerCase().includes(input.toLowerCase())
    );

    setFilterBikes(filtered);
  }, [input, bikeData, data, isSearchData]);

  return (
    <div>
      <div className="bg-light flex flex-col items-center py-20 max-md:px-4">
        <Title
          title="Available Bikes"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 h-12 shadow rounded-full w-full">
          <img
            src={assets.search_icon}
            alt="search icon"
            className="w-4.5 h-4.5 mr-2"
          />
          <input
            type="text"
            placeholder="Search by name, model or features"
            className="outline-none w-full text-gray-500 h-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            value={input}
          />
          <img
            src={assets.filter_icon}
            alt="filter icon"
            className="w-4.5 h-4.5 mr-2"
          />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filterBikes.length} bikes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filterBikes.map((bike, index) => (
            <div key={index}>
              <BikeCard bike={bike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
