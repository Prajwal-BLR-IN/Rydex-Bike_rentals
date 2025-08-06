import { motion } from "motion/react";
import Title from "./Title";

const Newsletter = () => {
  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 1 }}
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Title
          title="Never Miss a Deal!"
          subTitle="Subscribe to get the latest offers, new arrivals, and exclusive
        discounts"
        />
      </motion.div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 m-10"
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </motion.form>
    </motion.section>
  );
};

export default Newsletter;
