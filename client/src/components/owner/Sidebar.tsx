import React, { useState } from "react";
import {
  assets,
  dummyUserData,
  ownerMenuLinks,
  type dummyUserDataType,
} from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState<dummyUserDataType>(dummyUserData);
  const [image, setImage] = useState<Blob | null>(null);
  const location = useLocation();

  const updateImage = () => {
    if (image) {
      const newImageUrl = URL.createObjectURL(image);
      setUser({ ...user, image: newImageUrl });
      setImage(null);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      {/* Profile Image Upload */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || assets.bike_image3
            }
            alt="Profile"
            className="w-9 h-9 md:h-14 md:w-14 object-cover rounded-full mx-auto"
          />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit Icon" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex items-center px-2 gap-1 bg-primary/10 text-primary rounded"
        >
          <span>Save</span>
          <img src={assets.check_icon} width={13} alt="Check Icon" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Navigation Links */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;

          return (
            <NavLink
              to={link.path}
              key={index}
              className={`relative flex items-center gap-2 w-full py-3 pl-4 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <img src={isActive ? link.coloredIcon : link.icon} alt="icon" />
              <span className="max-md:hidden">{link.name}</span>
              {isActive && (
                <div className="bg-primary w-1.5 h-8 rounded-l absolute right-0"></div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
