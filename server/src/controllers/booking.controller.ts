import { Request, Response } from "express";
import { UserDocument } from "../models/users";
import BikeModel from "../models/Bike";
import mongoose from "mongoose";
import bookingModel from "../models/Bookings";
import { countTotalDays } from "../utils/getTotalsDays";

//Funciton to check availibity of car for a given date.
const checkAvailability = async (
  bike: string,
  pickupDate: string,
  returnDate: string
) => {
  const bookings = await bookingModel.find({
    bike,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

// API to check Availability of bikes for the given Date and location.
const checkAvailabilityOfBike = async (req: Request, res: Response) => {
  try {
    const { pickupDate, returnDate, location } = req.body;
    if (!pickupDate || !returnDate || !location)
      return res.status(404).json({
        success: false,
        message: "Missing details",
        missingData: [
          !location && "location",
          !pickupDate && "Pickup date",
          !returnDate && "Return date",
        ].filter(Boolean),
      });

    const bikes = await BikeModel.find({ location, isAvaliable: true });

    // serial vice fetching, bad for long data.
    // var availableBikes = [];

    // for (const bike of bikes) {
    //   const isAvailable = await checkAvailability(
    //     bike._id,
    //     pickupDate,
    //     returnDate
    //   );
    //   if (isAvailable) {
    //     availableBikes.push(bike);
    //   }
    // }

    // Parallel fetching, best for any scenario
    const availableBikesPromise = bikes.map(async (bike) => {
      const isAvailable = await checkAvailability(
        bike._id,
        pickupDate,
        returnDate
      );
      return { ...bike._doc, isAvailable: isAvailable };
    });

    let availableBikes = await Promise.all(availableBikesPromise);
    availableBikes = availableBikes.filter((bike) => bike.isAvailable === true);

    return res.status(200).json({
      success: true,
      availableBikes,
    });
  } catch (error: any) {
    console.log("Error getting all avilable bikes: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const bookTheBike = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = user._id as mongoose.Types.ObjectId;

    const { bikeId, pickupDate, returnDate } = req.body;
    if (!bikeId || !pickupDate || !returnDate)
      return res.status(404).json({
        success: false,
        message: "Missing details",
        missingData: [
          !bikeId && "Bike data",
          !pickupDate && "Pickup date",
          !returnDate && "Return date",
        ].filter(Boolean),
      });

    if (new Date(returnDate) <= new Date(pickupDate)) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    const isAvailable = await checkAvailability(bikeId, pickupDate, returnDate);

    if (!isAvailable)
      return res.status(400).json({
        success: false,
        message: "Bike is not available",
      });

    const bike = await BikeModel.findById(bikeId);

    if (bike.owner.toString() === _id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own vehicle",
      });
    }

    const price = countTotalDays(pickupDate, returnDate) * bike.pricePerDay;

    await bookingModel.create({
      bike: bikeId,
      owner: bike.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    bike.isAvaliable = false;
    await bike.save();

    return res.status(200).json({
      success: true,
      message:
        "Booking successfull, we will let your know owner's action sortly",
    });
  } catch (error: any) {
    console.log("Error booking the bike: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMybookings = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = user._id as mongoose.Types.ObjectId;

    const bookings = await bookingModel
      .find({ user: _id })
      .populate("bike")
      .sort({ createdAt: -1 });
    if (!bookings)
      return res.status(400).json({
        success: false,
        message: "You Don't have any bookings yet!",
      });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error: any) {
    console.log("Error getting users bookings: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get owner Bookings requests
const getOwnerBookings = async (req: Request, res: Response) => {
  try {
    const { role, _id } = req.user as UserDocument;

    if (role !== "owner") {
      res.status(404).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await bookingModel
      .find({ owner: _id })
      .populate("bike, user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error: any) {
    console.log("Error getting your bookings request: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changeBookingStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    const _id = user._id as mongoose.Types.ObjectId;

    const { bookingId, status } = req.body;

    if (!bookingId || !status)
      return res.status(404).json({
        success: false,
        message: "Missing details",
        missingData: [
          !bookingId && "Booking details",
          !status && "status",
        ].filter(Boolean),
      });

    const bookings = await bookingModel.findById(bookingId);

    if (bookings.owner.toString() === _id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You can't chanage your vehicle by yourself",
      });
    }

    bookings.status = status;
    await bookings.save();

    return res.status(200).json({
      success: true,
      message: "Status updated",
    });
  } catch (error: any) {
    console.log("Error updating the status: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  bookTheBike,
  checkAvailabilityOfBike,
  getMybookings,
  getOwnerBookings,
  changeBookingStatus,
};
