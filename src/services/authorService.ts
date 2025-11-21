import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import RoleModel from "../models/roleModel";
import UserRoleModel from "../models/userRole";
import { IUser } from "../types/userType";

export const registerUser = async (data: IUser) => {
  const { full_name, email, phone, password, address, role } = data;

  const existing = await UserModel.findOne({ $or: [{ email }, { phone }] });
  if (existing) throw new Error("Email or phone already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    full_name,
    email,
    phone,
    password: hashedPassword,
    address,
    role: role || "customer",
    created_by: role === "admin" ? "system" : "customer",
  });

  // Assign role in UserRole
  const roleDoc = await RoleModel.findOne({ name: role || "customer" });
  if (roleDoc) {
    await UserRoleModel.findOneAndUpdate(
      { user_id: user._id, role_id: roleDoc._id },
      { user_id: user._id, role_id: roleDoc._id },
      { upsert: true, new: true }
    );
  }

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.$assertPopulated("role"),
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { token, user };
};
