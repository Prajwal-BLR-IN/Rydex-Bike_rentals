import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useMyBookingQuery } from "../hooks/useMyBookingQuery";

const MyBookings = () => {
  const { data: bookings = [] } = useMyBookingQuery();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-34 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title="My Booking"
        subTitle="View and manage your all bike bookings"
        align="left"
      />
      <div>
        {bookings.map((booking, index) => {
          const status = booking.status as
            | "pending"
            | "confirmed"
            | "cancelled";
          return (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
            >
              {/* bike image and info */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking.bike.bikeImage}
                    alt="bike image"
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <p className="text-lg font-medium mt-2">
                  {booking.bike.brand} {booking.bike.bikeModel}
                </p>
                <p className="text-gray-500">
                  {booking.bike.year} • {booking.bike.bikeModel} •{" "}
                  {booking.bike.location}
                </p>
              </div>

              {/* Booking info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-light rounded">
                    Booking # {index + 1}
                  </p>
                  <p
                    className={`px-3 py-1.5 text-sm rounded-full ${
                      status === "confirmed"
                        ? "bg-green-400/15 text-green-600"
                        : status === "cancelled"
                        ? "bg-red-400/15 text-red-600"
                        : "bg-yellow-400/15 text-yellow-600"
                    } `}
                  >
                    {status}
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt="calender icon"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {booking.pickupDate.split("T")[0]} To{" "}
                      {booking.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.location_icon_colored}
                    alt="calender icon"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500">Pickup location</p>
                    <p>{booking.bike.location}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div className="text-sm text-gray-500 text-right">
                  <p>Total price</p>
                  <h2 className="text-2xl font-semibold text-green-600">
                    र{booking.price}
                  </h2>
                  <p>Booked on {booking.createdAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
