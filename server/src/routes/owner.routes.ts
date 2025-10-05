import express from "express";
import protect from "../middleware/getUserInfo.js";
import {
  addBike,
  deleteBike,
  getDashboardData,
  getOwnersBikes,
  toggleBikeAvailability,
  updateProfilePicture,
} from "../controllers/owner.controller.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/add-bike", upload.single("bikeImage"), protect, addBike);
ownerRouter.post(
  "/update-profile-pic",
  upload.single("profileImage"),
  protect,
  updateProfilePicture
);
ownerRouter.use(protect);
ownerRouter.get("/my-listing", getOwnersBikes);
ownerRouter.post("/toggle-bike", toggleBikeAvailability);
ownerRouter.post("/delete-bike", deleteBike);
ownerRouter.get("/dashboard", getDashboardData);
export default ownerRouter;
