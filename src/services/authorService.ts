import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import RoleModel from "../models/roleModel";
import UserRoleModel from "../models/userRole";
import { IUser } from "../types/userType";

export const registerUser = async (data: IUser) => {
  const { full_name, email, phone, password, address } = data;

  // Check if the email or phone already exists in the database
  const existing = await UserModel.findOne({ $or: [{ email }, { phone }] });
  if (existing) throw new Error("Email or phone already exists");

  // Hash the password so it cannot be read by anyone
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const user = await UserModel.create({
    full_name,
    email,
    password: hashedPassword, // save hashed password, not the real one
    phone,
    address,
  });

  // Find the role named "customer"
  const userRole = await RoleModel.findOne({ name: "customer" });

  // If the role exists, save the user-role record
  if (userRole) {
    await UserRoleModel.create({
      user: user._id, // user ID
      role: userRole._id, // role ID
    });
  }
};

export const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Create a JWT token for the user (used for login sessions)
  const token: string = jwt.sign(
    {
      userId: user._id, // put user ID inside the token
      email: user.email,
      role: (user as any).role, // optional role data
    },
    process.env.JWT_SECRET!, // secret key from .env file
    { expiresIn: "7d" } // token will expire in 7 days
  );

  // Return user data and the token
  return { user, token };
};
