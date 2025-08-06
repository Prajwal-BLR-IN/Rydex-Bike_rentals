import React from "react";
import Title from "./Title";
import { motion } from "motion/react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aarav Mehta",
      address: "Bangalore, Karnataka",
      image:
        "https://images.unsplash.com/photo-1729157661483-ed21901ed892?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      review:
        "Booked a bike on short notice and the pickup was super smooth. The vehicle was well-maintained and perfect for city traffic. Definitely my go-to rental service in Bangalore!",
    },
    {
      id: 2,
      name: "Rohan Iyer",
      address: "Mumbai, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1662145349402-f78c521eccb0?q=80&w=384&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
      review:
        "Rydex made my weekend getaway super easy. The scooty was in great condition and very fuel-efficient. Would totally rent again!",
    },
    {
      id: 3,
      name: "Priya Sharma",
      address: "Chennai, Tamil Nadu",
      image:
        "https://images.unsplash.com/photo-1649086840813-40738c9fe449?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      review:
        "Excellent service and very responsive support. The bike was delivered on time and ran flawlessly throughout my 3-day trip. Rydex is reliable and affordable!",
    },
  ];

  const Star = ({ filled }: { filled: boolean }) => (
    <svg
      className="w-4 h-4 text-primary"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
      />
    </svg>
  );
  return (
    <section className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Real riders. Real reviews. Discover why they choose Rydex for every ride."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
            key={testimonial.id}
            className="bg-white p-6 rounded-xl  shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-auto rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star key={index} filled={testimonial.rating > index} />
                    ))}
                </div>
              </div>
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.review}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
