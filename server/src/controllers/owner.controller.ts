import { Request, Response } from "express";
import userModel, { UserDocument } from "../models/users";
import fs from "fs";
import imagekit from "../config/imagekit";
import BikeModel from "../models/Bike";
import mongoose from "mongoose";
import bookingModel from "../models/Bookings";

const addBike = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const { _id } = user;

    let bike = JSON.parse(req.body.bikeData);
    const bikeImageFile = req.file;

    if (!bikeImageFile)
      return res
        .status(400)
        .json({ success: false, message: "Image is missing" });

    const fileBuffer = fs.readFileSync(bikeImageFile?.path);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: bikeImageFile.originalname + "-" + Date.now(),
      folder: "/bikes",
    });

    //get the url
    var imageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await BikeModel.create({ ...bike, owner: _id, bikeImage: imageURL });

    return res.status(200).json({ success: true, message: "Bike added" });
  } catch (error: any) {
    console.log("Error during adding the bike: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getOwnersBikes = async (req: Request, res: Response) => {
  const user = req.user as UserDocument;
  const { _id } = user;

  try {
    const bikes = await BikeModel.find({ owner: _id });
    return res.status(200).json({ success: true, bikes });
  } catch (error: any) {
    console.log("Error fetching owners all bikes: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const toggleBikeAvailability = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = (user._id as mongoose.Types.ObjectId).toString();

    const { bikeId } = req.body;

    const bike = await BikeModel.findById(bikeId);
    if (!bike) {
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }

    if (bike.owner.toString() !== _id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    bike.isAvaliable = !bike.isAvaliable;
    await bike.save();

    return res
      .status(200)
      .json({ success: true, isAvaliable: bike.isAvaliable });
  } catch (error: any) {
    console.log("Error toggling bike availability: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = (user._id as mongoose.Types.ObjectId).toString();

    const { bikeId } = req.body;

    const bike = await BikeModel.findById(bikeId);
    if (!bike) {
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }

    if (bike.owner.toString() !== _id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    bike.owner = null;
    bike.isAvaliable = false;
    await bike.save();

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.log("Error deleting bike: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const { _id, role } = req.user as UserDocument;

    if (role !== "owner")
      return res.status(403).json({ success: false, message: "Unauthorized" });

    const bikes = await BikeModel.find({ owner: _id });

    const bookings = await bookingModel
      .find({ owner: _id })
      .populate("bike")
      .sort({ createdAt: -1 });

    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
    );
    const completedBookings = bookings.filter(
      (booking) => booking.status === "confirmed"
    );

    const montlyRevenue = completedBookings.reduce(
      (acc, booking) => acc + booking.price,
      0
    );

    const dashboardData = {
      totalBikes: bikes.length,
      totalBookings: bookings.length,
      pendingBooking: pendingBookings.length,
      completeBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue: montlyRevenue,
    };

    return res.status(200).json({ success: true, dashboardData });
  } catch (error: any) {
    console.log("Error getting dashboard data: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to update user image from sidebar
const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = user._id as mongoose.Types.ObjectId;

    const profileImage = req.file;

    if (!profileImage)
      return res
        .status(400)
        .json({ success: false, message: "Image is missing" });

    const fileBuffer = fs.readFileSync(profileImage?.path);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: profileImage.originalname + "-" + Date.now(),
      folder: "/users",
    });

    //get the url
    var imageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await userModel.findByIdAndUpdate(_id, { profileImage: imageURL });

    return res.status(200).json({ success: true, message: "Image updated" });
  } catch (error: any) {
    console.log("Error updating owner's profile picture: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addBike,
  getOwnersBikes,
  toggleBikeAvailability,
  deleteBike,
  getDashboardData,
  updateProfilePicture,
};
