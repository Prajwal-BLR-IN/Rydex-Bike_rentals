import React from "react";
import Title from "./Title";

const Newsletter = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
      <Title
        title="Never Miss a Deal!"
        subTitle="Subscribe to get the latest offers, new arrivals, and exclusive
        discounts"
      />

      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 m-10">
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
      </form>
    </section>
  );
};

export default Newsletter;
