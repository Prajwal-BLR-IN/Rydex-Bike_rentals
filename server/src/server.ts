import express from "express";
import "dotenv/config";
import cors from "cors";
import ConnectToDB from "./config/database";
import userRoute from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send("API Running 👍🏽"));
app.use("/api/user", userRoute);

app.listen(PORT, async () => {
  console.log(`Server running in http://localhost:${PORT}`);
  await ConnectToDB();
});
