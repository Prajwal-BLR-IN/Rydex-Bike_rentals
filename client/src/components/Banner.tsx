import React from "react";
import { assets } from "../assets/assets";
import { motion, scale } from "motion/react";

const Banner = () => {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center md:flex-row md:items-center justify-between px-8 min-md:pl-14 bg-gradient-to-b md:bg-gradient-to-r from-primary-dull to-primary-light max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden text-white max-sm:py-8"
    >
      <div>
        <h2 className="text-3xl font-medium">Do You Own a Bike?</h2>
        <div>
          <p className="mt-2">
            Monetize your vehicle effortlessly by listing it on CarRental.
          </p>
          <p className="max-w-130">
            We take care of insurance, driver verification and secure payments -
            so you can earn passive income, stress-free.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer"
        >
          List your Bike
        </motion.button>
      </div>
      <motion.img
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        src={assets.banner_bike_image}
        alt="banner bike"
        className="max-h-50 w-max mt-10"
      />
    </motion.section>
  );
};

export default Banner;
