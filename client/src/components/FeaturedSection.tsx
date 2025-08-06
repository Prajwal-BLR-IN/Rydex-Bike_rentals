import BikeCard from "./BikeCard";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useBikesQuery } from "../hooks/useBikesQuery";
import DataEmpty from "./DataEmpty";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const { data: bikeData = [], isError } = useBikesQuery();

  return (
    <motion.section
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 mt-20"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>
      {isError || !bikeData || bikeData.length === 0 ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <DataEmpty
            title="No bikes added yet"
            para="Featured bike will appear here once someone list there bike"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 "
        >
          {bikeData
            .slice(0, 6)
            .filter((bike) => bike.isAvaliable)
            .map((bike) => (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                key={bike._id}
              >
                <BikeCard key={bike._id} bike={bike} />
              </motion.div>
            ))}
        </motion.div>
      )}

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        onClick={() => {
          navigate("/bikes");
          scrollTo(0, 0);
        }}
        className="flex gap-2 items-center px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        <span>Explore all bikes</span>
        <img src={assets.arrow_icon} alt="arrow_icon" />
      </motion.button>
    </motion.section>
  );
};

export default FeaturedSection;
