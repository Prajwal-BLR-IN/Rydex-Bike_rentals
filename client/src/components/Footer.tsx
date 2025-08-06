import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor"
      >
        <div className="max-w-80">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-9 -m-1.5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-80 mt-3"
          >
            Premium bike rental service with a wide selection of luxury and
            everyday vehicles for all your riding needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook logo"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram logo"
                className="w-5 h-5"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/prajwal-k-b26344173/"
              target="_blank"
            >
              <img
                src={assets.linkedin_logo}
                alt="linkedin logo"
                className="w-5 h-5"
              />
            </a>
            <a href="mailto:prajwalsjp2000@gmail.com">
              <img
                src={assets.gmail_logo}
                alt="gmail logo"
                className="w-5 h-5 translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          <div>
            <h2 className="text-base font-medium uppercase text-gray-800">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/bikes">Browse Bikes</Link>
              </li>
              <li>
                <Link to="/">List Your Bike</Link>
              </li>
              <li>
                <Link to="/">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium uppercase text-gray-800">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Terms of Service</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Insurance</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium uppercase text-gray-800">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>1234 High Street</li>
              <li>Bangalore, KA, 12345</li>
              <li>+91 1234567890</li>
              <li>info@example.com</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/in/prajwal-k-b26344173/"
            target="_blank"
          >
            Rydex
          </a>
          . All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Cookie</a>
          </li>
        </ul>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
