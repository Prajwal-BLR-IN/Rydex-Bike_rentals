import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useState } from "react";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";
import ButtonLoader from "../ButtonLoader";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();

  const updateImage = async () => {
    try {
      const formData = new FormData();
      if (image) formData.append("profileImage", image);
      const { data } = await axiosInstance.post(
        "/owner/update-profile-pic",
        formData
      );
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setUploading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Error during updating image");
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      {/* Profile Image Upload */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : authUser?.profileImage}
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
          onClick={() => {
            setUploading(true);
            updateImage();
          }}
          disabled={uploading}
          className={`absolute top-1 cursor-pointer flex items-center px-2 gap-1 bg-primary/10 text-primary rounded ${
            uploading ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          <span className="flex items-center justify-center gap-1.5 p-1">
            {uploading ? (
              <>
                <ButtonLoader />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save</span>
                <img src={assets.check_icon} width={13} alt="Check Icon" />
              </>
            )}
          </span>
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden">{authUser?.name}</p>

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
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt="icon"
                // className="w-5"
              />
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
