import mongoose, { Schema, Document, Types } from "mongoose";

export interface BikeDocumentType extends Document {
  owner: Types.ObjectId;
  brand: string;
  bikeModel: string;
  bikeImage: string;
  year: number;
  category: string;
  top_speed: number;
  helmet: string;
  fuel_type: string;
  pricePerDay: number;
  location: string;
  description: string;
  isAvaliable: boolean;
}

const bikeSchema: Schema<BikeDocumentType> = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    brand: { type: String, required: true },
    bikeModel: { type: String, required: true },
    bikeImage: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    top_speed: { type: Number, required: true },
    helmet: { type: String, required: true },
    fuel_type: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BikeModel =
  mongoose.models.bike || mongoose.model<BikeDocumentType>("bike", bikeSchema);

export default BikeModel;
