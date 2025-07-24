import BikeCard from "./BikeCard";
import Title from "./Title";
import { assets, dummyBikeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="Featured Vehicles"
        subTitle="Explore our selection of premium vehicles available for your next adventure."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ">
        {dummyBikeData
          .slice(0, 6)
          .filter((bike) => bike.isAvaliable)
          .map((bike) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
      </div>

      <button
        onClick={() => navigate("/bikes")}
        className="flex gap-2 items-center px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        <span>Explore all bikes</span>
        <img src={assets.arrow_icon} alt="arrow_icon" />
      </button>
    </section>
  );
};

export default FeaturedSection;
