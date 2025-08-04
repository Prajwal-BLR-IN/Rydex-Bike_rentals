import { assets, type BikeModelType } from "../../assets/assets";
import TitleOwner from "../../components/owner/TitleOwner";

import DataEmpty from "../../components/DataEmpty";
import { useOwnerBikesQuery } from "../../hooks/useOwnerBikesQuery";
import { useOwnerMutation } from "../../hooks/useOwnerMutation";
import toast from "react-hot-toast";

const ManageBike = () => {
  const { data: bikes, isLoading, isError } = useOwnerBikesQuery();

  const handleDeleteConfirmation = (bikeId: string) => {
    toast.custom((t) => (
      <div className="h-screen w-screen flex items-center justify-center ">
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-light shadow-lg rounded-lg pointer-events-auto flex items-start gap-4 px-4 py-7 ring-1 ring-borderColor ring-opacity-80`}
        >
          {/* Content */}
          <div className="flex flex-col flex-1 justify-center items-center">
            <p className="text-sm font-medium text-gray-800">
              Are you sure you want to delete this bike?
            </p>
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded-md border text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  deleteMutate({ bikeId: bikeId });
                }}
                className="px-3 py-1  cursor-pointer rounded-md bg-primary text-white text-sm hover:bg-primary-dull"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const { mutate: toggleMutate } = useOwnerMutation({
    url: "/owner/toggle-bike",
    invalidateKey: "owner-bikes",
  });

  const { mutate: deleteMutate } = useOwnerMutation({
    url: "/owner/delete-bike",
    invalidateKey: "owner",
    invalidateKey2: "owner-bikes",
  });

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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : isError || !bikes || bikes.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <DataEmpty
                    title="No Bike added"
                    para="Bike listing will be available when you add them"
                  />
                </td>
              </tr>
            ) : (
              bikes.map((bike: BikeModelType, index: number) => (
                <tr key={index} className="border-t border-borderColor">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={bike.bikeImage}
                      alt="bike"
                      className="w-12 h-12 aspect-square rounded-md object-cover"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {bike.brand} {bike.bikeModel}
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
                  <td className="p-3 flex items-center gap-2 ">
                    <img
                      src={
                        bike.isAvaliable
                          ? assets.eye_close_icon
                          : assets.eye_icon
                      }
                      alt="Toggle Status"
                      className="cursor-pointer rounded-full transition-all hover:bg-gray-100"
                      onClick={() => {
                        toggleMutate({ bikeId: bike._id });
                      }}
                    />
                    <img
                      src={assets.delete_icon}
                      alt="Delete"
                      className=" cursor-pointer rounded-full transition-all hover:bg-gray-100"
                      onClick={() => handleDeleteConfirmation(bike._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBike;
