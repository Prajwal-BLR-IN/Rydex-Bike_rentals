import express from "express";
import { getAllAvailableBikes } from "../controllers/bike.controller";

const bikeRoute = express.Router();

bikeRoute.get("/", getAllAvailableBikes);

export default bikeRoute;
