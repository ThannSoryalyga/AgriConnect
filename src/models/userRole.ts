import mongoose from "mongoose";

export const UserRoleModel = mongoose.model(
  "UserRole",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  }),
  "user_roles"
);
