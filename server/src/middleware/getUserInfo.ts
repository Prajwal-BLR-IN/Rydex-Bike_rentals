import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/users";

const protect = async (req: Request, res: Response, next: NextFunction) => {
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

    //  Instead of checking "typeof decodedToken === 'object'" and "id" in decodedToken,
    //    we directly cast the verified token to the expected structure using TypeScript's "as".
    //    This gives better type safety, cleaner code, and auto-complete for decodedToken.id.

    // if (typeof decodeToken === "object" && "id" in decodeToken) {
    const decodedToken = jwt.verify(token, jwtSecret) as { id: string };
    const user = await userModel.findById(decodedToken.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, user not found" });
    }

    req.user = user;

    next();
    // } else {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized, invalid token payload",
    //   });
    // }
  } catch (error: any) {
    console.log("Error in the getUserInfo middleware", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default protect;
