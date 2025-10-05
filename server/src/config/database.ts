import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

// Cache connection across serverless invocations
let cached: any = globalThis as any;
cached.mongoose = cached.mongoose || { conn: null, promise: null };

const ConnectToDB = async () => {
  if (cached.mongoose.conn) return cached.mongoose.conn;

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose
      .connect(`${MONGO_URI}/rydex-db`)
      .then((mongoose) => mongoose);
  }

  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
};

export default ConnectToDB;
