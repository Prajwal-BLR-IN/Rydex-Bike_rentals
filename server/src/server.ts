import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectToDB from "./config/database";
import userRoute from "./routes/user.routes";
import ownerRouter from "./routes/owner.routes";
import bookingRouter from "./routes/booknig.routes";

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API Running 👍🏽"));
app.use("/api/user", userRoute);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, async () => {
  console.log(`Server running in http://localhost:${PORT}`);
  await ConnectToDB();
});
