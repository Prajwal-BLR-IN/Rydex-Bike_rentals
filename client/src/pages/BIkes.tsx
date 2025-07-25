import React, { useState } from "react";
import Title from "../components/Title";
import { assets, dummyBikeData } from "../assets/assets";
import BikeCard from "../components/BikeCard";

const BIkes = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="bg-light flex flex-col items-center py-20 max-md:px-4">
        <Title
          title="Available Bikes"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <div className="flex items-center  bg-white px-4 mt-6 max-w-140 h-12 shadow rounded-full w-full">
          <img
            src={assets.search_icon}
            alt="seach icon"
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
          Showing {dummyBikeData.length} bikes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyBikeData.map((bike, index) => (
            <div key={index}>
              <BikeCard bike={bike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BIkes;
