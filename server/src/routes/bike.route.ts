import express from "express";
import { getAllAvailableBikes } from "../controllers/bike.controller.js";

const bikeRoute = express.Router();

bikeRoute.get("/", getAllAvailableBikes);

export default bikeRoute;
