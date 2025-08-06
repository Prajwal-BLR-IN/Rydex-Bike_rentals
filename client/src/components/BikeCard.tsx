import { assets, type BikeModelType } from "../assets/assets";
import { useNavigate } from "react-router-dom";

interface BikeCardProps {
  bike: BikeModelType;
}

const BikeCard = ({ bike }: BikeCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/bike-details/${bike._id}`);
        scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer "
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={bike.bikeImage}
          alt="bike 1"
          className="w-full
             h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <p className="absolute top-4 left-4 rounded-full bg-green-700/90 text-xs px-2.5 py-1 text-white">
          Available now
        </p>
        <p className="absolute right-4 bottom-4 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">र{bike.pricePerDay}</span>{" "}
          <span className="text-sm text-white/80">/ day</span>
        </p>
      </div>
      <div>
        <div className="m-4 sm:m-5">
          <div className="mb-4">
            <h2 className="font-medium text-lg">
              {bike.brand} {bike.bikeModel}
            </h2>
            <p className="text-gray-700 ">
              {bike.category} • {bike.year}{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="flex gap-1 items-center text-gray-600 text-sm">
              <img src={assets.speed_icon} alt="" className="h-5" />
              <span>{bike.top_speed} km/h</span>
            </p>
            <p className="flex gap-1 items-center text-gray-600 text-sm">
              <img src={assets.fuel_icon} alt="" className="h-5" />
              <span>{bike.fuel_type}</span>
            </p>
            <p className="flex gap-1 items-center text-gray-600 text-sm">
              <img src={assets.helmet_icon} alt="" className="h-5" />
              <span>{bike.helmet}</span>
            </p>
            <p className="flex gap-1 items-center text-gray-600 text-sm">
              <img src={assets.location_icon} alt="" className="h-5" />
              <span>{bike.location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
