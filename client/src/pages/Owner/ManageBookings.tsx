import TitleOwner from "../../components/owner/TitleOwner";
import { type BookingType } from "../../assets/assets";
import DataEmpty from "../../components/DataEmpty";
import { useBookingQuery } from "../../hooks/useBookingQuery";
import ComponentLoader from "../../components/ComponentLoader";
import { useOwnerMutation } from "../../hooks/useOwnerMutation";

const ManageBookings = () => {
  const { data: bookingData, isError, isLoading } = useBookingQuery();

  const { mutate: bookingStatusMutate } = useOwnerMutation({
    url: "/bookings/change-status",
    invalidateKey: "bookings",
    invalidateKey2: "my-bookings",
  });

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />
      {isLoading ? (
        <tr>
          <td colSpan={5} className="p-4">
            <ComponentLoader />
          </td>
        </tr>
      ) : isError || !bookingData || bookingData.length === 0 ? (
        <DataEmpty
          title="No Booking yet"
          para="Booking data will be available when user books your vehicle"
        />
      ) : (
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Bike</th>
                <th className="p-3 font-medium max-md:hidden">Date Range</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium max-md:hidden">Payment</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking: BookingType, index: number) => (
                <tr
                  key={index}
                  className="border-t border-borderColor text-gray-500"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking.bike.bikeImage}
                      alt="image"
                      className="h-12 w-12 aspect-square rounded-md object-cover"
                    />
                    <p className="font-medium max-md:hidden">
                      {booking.bike.brand} {booking.bike.bikeModel}
                    </p>
                  </td>
                  <td className="p-3 max-md:hidden">
                    {booking.pickupDate.split("T")[0]} to{" "}
                    {booking.returnDate.split("T")[0]}
                  </td>
                  <td className="p-3">₹{booking.price}</td>
                  <td className="p-3 max-md:hidden">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      offline
                    </span>
                  </td>
                  <td className="p-3">
                    {booking.status === "pending" ? (
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          bookingStatusMutate({
                            bookingId: booking._id,
                            status: e.target.value,
                          })
                        }
                        className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancel</option>
                        <option value="confirmed">Confirm</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
