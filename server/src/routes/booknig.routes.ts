import express from "express";
import protect from "../middleware/getUserInfo";
import {
  bookTheBike,
  changeBookingStatus,
  checkAvailabilityOfBike,
  getMybookings,
  getOwnerBookings,
} from "../controllers/booking.controller";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfBike);
bookingRouter.use(protect);
bookingRouter.post("/create", bookTheBike);
bookingRouter.get("/my-booking", getMybookings);
bookingRouter.get("/owner", getOwnerBookings);
bookingRouter.post("/change-status", changeBookingStatus);

export default bookingRouter;
