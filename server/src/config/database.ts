import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    const mongo_uri = process.env.MONGO_URI;
    if (!mongo_uri) throw new Error("Mongo_URI is not found");
    await mongoose.connect(`${mongo_uri}/rydex-db`);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default ConnectToDB;
