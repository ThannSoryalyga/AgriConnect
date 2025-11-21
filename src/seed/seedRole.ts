import mongoose from "mongoose";
import dotenv from "dotenv";

import roleModel from "../models/roleModel";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

async function seedRoles() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const roles = ["Admin", "Customer", "Farmer"];

    for (const roleName of roles) {
      const role = await roleModel.findOneAndUpdate(
        { name: roleName },
        { name: roleName },
        { new: true, upsert: true }
      );
      console.log(`Role created/updated: ${role.name}`);
    }

    console.log("All roles seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding roles:", err);
    process.exit(1);
  }
}

seedRoles();
