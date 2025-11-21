import mongoose from "mongoose";

export const RoleModel = mongoose.model(
  "Role",
  new mongoose.Schema({ name: { type: String, required: true, unique: true } }),
  "roles"
);
