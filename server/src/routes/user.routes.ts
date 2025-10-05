import express from "express";
import {
  changeOwnership,
  getUserInformation,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import protect from "../middleware/getUserInfo.js";
import upload from "../middleware/multer.js";

const userRoute = express.Router();

userRoute.post("/signup", upload.single("profileImage"), signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.get("/me", protect, getUserInformation);
userRoute.post("/onboarding", protect, changeOwnership);

export default userRoute;
