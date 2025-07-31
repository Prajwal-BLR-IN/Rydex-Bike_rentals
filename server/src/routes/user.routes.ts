import express from "express";
import {
  getUserInformation,
  login,
  logout,
  signup,
} from "../controllers/user.controller";
import protect from "../middleware/getUserInfo";

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.get("/me", protect, getUserInformation);

export default userRoute;
