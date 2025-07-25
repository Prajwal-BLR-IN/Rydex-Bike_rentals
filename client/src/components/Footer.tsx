import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor">
        <div className="max-w-80">
          <img src={assets.logo} alt="logo" className="h-8 md:h-9 -m-1.5" />
          <p className="max-w-80 mt-3">
            Premium bike rental service with a wide selection of luxury and
            everyday vehicles for all your riding needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
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
          </div>
        </div>

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
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
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
      </div>
    </footer>
  );
};

export default Footer;
