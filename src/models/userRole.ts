import { IUserRoles } from "../types/userRoleType";
import { model, Schema } from "mongoose";

// Define the schema for linking users to roles
const userRolesSchema = new Schema<IUserRoles>(
  {
    // The user ID (reference to the User collection)
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },

    // The role ID (reference to the Role collection)
    role: { type: Schema.Types.ObjectId, ref: "role", required: true },
  },
  {
    // Automatically adds: createdAt, updatedAt
    timestamps: true,
  }
);

// Make sure each user can only have ONE of the same role
// Example: user cannot have Admin role twice
userRolesSchema.index({ user: 1, role: 1 }, { unique: true });

// Export the model so it can be used in controllers/services
export default model<IUserRoles>("userRoles", userRolesSchema);
