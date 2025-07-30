import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/users";

const GetUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized, please login" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
      throw new Error("jwt token not found in environment variable file");

    const decodeToken = jwt.verify(token, jwtSecret);

    if (!decodeToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, please login" });
    }

    if (typeof decodeToken === "object" && "id" in decodeToken) {
      const user = await userModel.findById(decodeToken.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized, user not found" });
      }

      req.user = user;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token payload",
      });
    }
  } catch (error: any) {
    console.log("Error in the getUserInfo middleware", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
