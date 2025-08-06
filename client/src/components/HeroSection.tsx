import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(
      `/bikes?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Rent. Ride. Rule the Streets.
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation ? pickupLocation : "Please Select Location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickupDate">Pick-up Date</label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="returnDate">Return-up Date</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" flex items-center justify-center gap-1 bg-primary rounded-full px-9 py-3 hover:bg-primary-dull text-white cursor-pointer max-sm:mt-4"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          <span>Search</span>
        </button>
      </form>
      <img src={assets.main_bike} alt="" className="max-h-90" />
    </div>
  );
};

export default HeroSection;
