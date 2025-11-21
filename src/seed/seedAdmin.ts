import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import userModel from "../models/userModel";
import roleModel from "../models/roleModel";
import userRoleModel from "../models/userRole";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

async function createAdminSeed() {
  try {
    // 1. Connect to database
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 2. Create or update role "Admin"
    const adminRole = await roleModel.findOneAndUpdate(
      { name: "Admin" },
      { name: "Admin" },
      { new: true, upsert: true }
    );

    console.log("Admin role:", adminRole);

    // 3. Create or update admin user
    const email = process.env.ADMIN_EMAIL!;
    const pwd = process.env.ADMIN_PASSWORD!;
    const firstName = process.env.ADMIN_FIRST_NAME!;
    const lastName = process.env.ADMIN_LAST_NAME!;
    const phone = process.env.ADMIN_PHONE!;

    const hashedPassword = await bcrypt.hash(pwd, 10);

    const adminUser = await userModel.findOneAndUpdate(
      { email },
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        phone: phone,
      },
      { new: true, upsert: true }
    );

    console.log("Admin user created:", adminUser);

    // 4. Assign admin role to the user
    await userRoleModel.updateOne(
      { user: adminUser._id },
      { user: adminUser._id, role: adminRole._id },
      { upsert: true }
    );

    console.log("Admin role assigned successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdminSeed();
