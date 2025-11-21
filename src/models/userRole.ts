import { IUserRoles } from "../types/userRoleType";
import { model, Schema } from "mongoose";

const userRolesSchema = new Schema<IUserRoles>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    role: { type: Schema.Types.ObjectId, ref: "role", required: true },
  },
  {
    timestamps: true,
  }
);

userRolesSchema.index({ user: 1, role: 1 }, { unique: true });

export default model<IUserRoles>("userRoles", userRolesSchema);
