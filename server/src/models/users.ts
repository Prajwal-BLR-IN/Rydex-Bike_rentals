import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  role: "user" | "owner";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    profileImage: { type: String, required: true, default: "" },
    role: { type: String, enum: ["user", "owner"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.email = this.email.toLowerCase();
    next();
  } catch (error: any) {
    console.log("Error hashing the password", error);
    next(error);
  }
});

const userModel: Model<UserDocument> =
  mongoose.models.user || mongoose.model<UserDocument>("user", userSchema);

export default userModel;
