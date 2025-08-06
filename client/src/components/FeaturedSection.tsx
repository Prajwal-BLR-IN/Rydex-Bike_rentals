import BikeCard from "./BikeCard";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useBikesQuery } from "../hooks/useBikesQuery";
import DataEmpty from "./DataEmpty";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const { data: bikeData = [], isError } = useBikesQuery();

  return (
    <section className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 mt-20">
      <Title
        title="Featured Vehicles"
        subTitle="Explore our selection of premium vehicles available for your next adventure."
      />
      {isError || !bikeData || bikeData.length === 0 ? (
        <DataEmpty
          title="No bikes added yet"
          para="Featured bike will appear here once someone list there bike"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ">
          {bikeData
            .slice(0, 6)
            .filter((bike) => bike.isAvaliable)
            .map((bike) => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
        </div>
      )}

      <button
        onClick={() => {
          navigate("/bikes");
          scrollTo(0, 0);
        }}
        className="flex gap-2 items-center px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        <span>Explore all bikes</span>
        <img src={assets.arrow_icon} alt="arrow_icon" />
      </button>
    </section>
  );
};

export default FeaturedSection;
