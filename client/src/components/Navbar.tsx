import { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { motion } from "motion/react";

type setShowLoginPropType = {
  setShowLogin: (value: boolean) => void;
};

const Navbar = ({ setShowLogin }: setShowLoginPropType) => {
  const { authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOwner = authUser?.role === "owner";
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: authMutate } = useAuthMutation({
    url: "/user/logout",
    invalidateKey: "authUser",
  });

  const { mutate: ownerMutate } = useAuthMutation({
    url: "/user/onboarding",
    invalidateKey: "authUser",
  });

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all
        ${location.pathname === "/" && "bg-light"}`}
    >
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8"
        />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50  ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `relative inline-block px-2 py-1 text-gray-700
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5
               after:bg-gray-700 after:w-0 after:transition-all after:duration-300
                 hover:after:w-full
                ${isActive ? "after:w-full font-semibold text-gray-600" : ""}`
            }
            onClick={() => setOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}

        <div className=" hidden lg:flex items-center text-sm gap-2 border border-borderColor rounded-full px-3 max-w-56 ">
          <input
            type="text"
            placeholder="search bikes"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search icon" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={
              isOwner ? () => navigate("/owner") : () => ownerMutate(null)
            }
            className="cursor-pointer"
          >
            {isOwner ? "Dashboard" : "List Bike"}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                authMutate(null);
              }}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          aria-label="Menu"
        />
      </button>
    </motion.div>
  );
};

export default Navbar;
