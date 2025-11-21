import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: "hashedpassword";
  phone?: string;
  address?: string;
}

const UserSchema: Schema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
