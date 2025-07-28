import React, { useEffect, useState } from "react";
import { assets, dummyBikeData, type BikeModelType } from "../../assets/assets";
import TitleOwner from "../../components/owner/TitleOwner";

const ManageBike = () => {
  const [bikes, setBikes] = useState<BikeModelType[]>([]);
  const fetchOwnersBikes = async () => {
    setBikes(dummyBikeData);
  };

  useEffect(() => {
    fetchOwnersBikes();
  }, []);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner
        title="Manage Bikes"
        subTitle="View all listed bikes, update their details, or remove them from the booking platform."
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Bike</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={bike.image}
                    alt="bike image"
                    className="w-12 h-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {bike.brand} {bike.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bike.top_speed} | {bike.fuel_type}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{bike.category}</td>
                <td className="p-3">₹{bike.pricePerDay}/day</td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      bike.isAvaliable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {bike.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3 flex items-center">
                  <img
                    src={
                      bike.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="eye icon"
                    className="cursor-pointer"
                  />
                  <img
                    src={assets.delete_icon}
                    alt="eye icon"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBike;
