import { Schema, model } from "mongoose";
import { IUser } from "../types/userType";

const userSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    address: { type: String },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
