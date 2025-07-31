import express from "express";
import protect from "../middleware/getUserInfo";
import {
  addBike,
  changeOwnership,
  deleteBike,
  getOwnersBikes,
  toggleBikeAvailability,
} from "../controllers/owner.controller";
import upload from "../middleware/multer";

const ownerRouter = express.Router();

ownerRouter.use(protect);
ownerRouter.post("/onboarding", changeOwnership);
ownerRouter.post("/add-bike", upload.single("bikeImage"), addBike);
ownerRouter.get("/my-listing", getOwnersBikes);
ownerRouter.post("/toggle-bike", toggleBikeAvailability);
ownerRouter.post("/delete-bike", deleteBike);

export default ownerRouter;
