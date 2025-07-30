import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
