import { Request, Response } from "express";
import userModel from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response) => {
  const { profileImage, name, email, password } = req.body;

  if (!profileImage || !name || !email || !password || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Missing details",
      Missing: [
        !profileImage && "profile image",
        !email && "email",
        !password && "password",
        password.length < 8 && "password",
      ].filter(Boolean),
    });
  }

  try {
    const ExistingUser = await userModel.findOne({ email });

    if (ExistingUser)
      return res.status(400).json({
        success: false,
        message: "user already exist, please use different email",
      });

    const user = await userModel.create({
      profileImage,
      name,
      email,
      password,
    });
    user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
      throw new Error("JWT secrete is not found in environment veriable");
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (error: any) {
    console.log("Error during registration: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Missing details",
      Missing: [
        !email && "email",
        !password && "password",
        password.length < 8 && "password",
      ].filter(Boolean),
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
      throw new Error("JWT secrete is not found in environment veriable");
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.log("Error during login: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error: any) {
    console.log("Error during logout: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserInformation = (req: Request, res: Response) => {
  try {
    const { user } = req;
    return res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.log("Error during getting user info: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { signup, login, logout };
