import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, type BikeModelType } from "../assets/assets";
import Loader from "../components/Loader";
import { useBikesQuery } from "../hooks/useBikesQuery";
import { useStore } from "../store/useStore";
import { useOwnerMutation } from "../hooks/useOwnerMutation";

type featuresType = {
  icon: string;
  text: string | undefined;
};

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState<BikeModelType | null>(null);
  const { data: bikeData = [] } = useBikesQuery();
  const { pickupDate, returnDate, setPickupDate, setReturnDate } = useStore();

  const { mutate: bookBikeMutation } = useOwnerMutation({
    url: "/bookings/create",
    invalidateKey: "bookings",
    invalidateKey2: "my-bookings",
    onSuccessRedirect: () => navigate("/my-bookings"),
  });

  const features: featuresType[] = [
    { icon: assets.speed_icon, text: `${bike?.top_speed} km/h` },
    { icon: assets.fuel_icon, text: bike?.fuel_type },
    { icon: assets.helmet_icon, text: bike?.helmet },
    { icon: assets.location_icon, text: bike?.location },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ bikeId: id, pickupDate, returnDate });
    bookBikeMutation({ bikeId: id, pickupDate, returnDate });
  };

  useEffect(() => {
    if (!id) return;
    setBike(bikeData.find((bike) => bike._id === id) || null);
  }, [id]);

  return bike ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="arrow icon"
          className="rotate-180 opacity-65"
        />
        <span>Back to all bikes</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: bike Image & Details */}
        <div className="lg:col-span-2">
          <img
            src={bike.bikeImage}
            alt="bike image"
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-4 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">
                {bike.brand} {bike.bikeModel}
              </h2>
              <p className="text-gray-500 text-lg">
                {bike.category} • {bike.year}
              </p>
              <hr className="border-borderColor my-6" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center justify-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="icon" className="h-6 mb-2" />
                  <span className="text-center">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500">{bike.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-medium mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check icon"
                    className="h-5 mr-2"
                  />
                  <span className="text-gray-500">GPS Tracking</span>
                </li>
                <li className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check icon"
                    className="h-5 mr-2"
                  />
                  <span className="text-gray-500">Bike Insurance</span>
                </li>
                <li className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check icon"
                    className="h-5 mr-2"
                  />
                  <span className="text-gray-500">Phone Mount</span>
                </li>
                <li className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check icon"
                    className="h-5 mr-2"
                  />
                  <span className="text-gray-500">Disc Brakes</span>
                </li>
                <li className="flex items-center">
                  <img
                    src={assets.check_icon}
                    alt="check icon"
                    className="h-5 mr-2"
                  />
                  <span className="text-gray-500">Dual Suspension</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Right: Booking form */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            ₹{bike.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">
              {" "}
              per day
            </span>{" "}
          </p>

          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull py-3 w-full text-white font-medium rounded-lg cursor-pointer transition-all"
          >
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default BikeDetails;
