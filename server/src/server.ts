import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectToDB from "./config/database.js";
import userRoute from "./routes/user.routes.js";
import ownerRouter from "./routes/owner.routes.js";
import bookingRouter from "./routes/booknig.routes.js";
import bikeRoute from "./routes/bike.route.js";

const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("API Running 👍🏽"));
app.use("/api/user", userRoute);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/bikes", bikeRoute);

// Connect to DB (serverless-friendly)
ConnectToDB()
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

// **Export app, do NOT use app.listen()**
export default app;
