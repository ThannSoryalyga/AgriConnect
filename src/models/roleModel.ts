import { IRole } from "../types/roleType";
import { model, Schema } from "mongoose";

const rolesModel = new Schema<IRole>(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IRole>("roles", rolesModel);
