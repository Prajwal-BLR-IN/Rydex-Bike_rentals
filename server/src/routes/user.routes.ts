import express from "express";
import { login, logout, signup } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export default userRoute;
