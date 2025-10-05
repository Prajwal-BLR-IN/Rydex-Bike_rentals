import { Request, Response } from "express";
import BikeModel from "../models/Bike.js";

const getAllAvailableBikes = async (req: Request, res: Response) => {
  try {
    const allAvailableBikes = await BikeModel.find({ isAvaliable: true });
    return res.status(200).json({ success: true, allAvailableBikes });
  } catch (error: any) {
    console.log("Error getting all bikes data", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllAvailableBikes };
