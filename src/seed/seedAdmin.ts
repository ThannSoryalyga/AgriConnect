import mongoose from "mongoose"; // For connecting to MongoDB
import dotenv from "dotenv"; // To read environment variables
import bcrypt from "bcryptjs"; // To hash passwords

import userModel from "../models/userModel"; // User collection
import roleModel from "../models/roleModel"; // Role collection
import userRoleModel from "../models/userRole"; // UserRole collection

dotenv.config(); // Load variables from .env

const MONGO_URI = process.env.MONGO_URI || ""; // MongoDB connection string

async function createAdminSeed() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 2. Create or update role "Admin"
    const adminRole = await roleModel.findOneAndUpdate(
      { name: "Admin" }, // Search filter
      { name: "Admin" }, // Data to insert/update
      { new: true, upsert: true } // Return the new doc, create if not exist
    );
    console.log("Admin role:", adminRole);

    // 3. Create or update admin user
    const email = process.env.ADMIN_EMAIL!;
    const pwd = process.env.ADMIN_PASSWORD!;
    const fullName = process.env.ADMIN_FULLNAME!;
    const [firstName, lastName] = fullName.split(" "); // Split full name into first & last
    const address = "Admin Address"; // Default address
    const phone = process.env.ADMIN_PHONE!;

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Create or update admin user in database
    const adminUser = await userModel.findOneAndUpdate(
      { email }, // Search filter by email
      {
        full_name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword, // Save hashed password
        phone: phone,
        address: address,
      },
      { new: true, upsert: true } // Return new doc, create if not exist
    );

    console.log("Admin user created:", adminUser);

    // 4. Assign the Admin role to this user
    await userRoleModel.updateOne(
      { user: adminUser._id }, // Search filter by user id
      { user: adminUser._id, role: adminRole._id }, // Assign role
      { upsert: true } // Create if not exist
    );

    console.log("Admin role assigned successfully!");
    process.exit(0); // Exit script successfully
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit with error
  }
}

// Run the admin seed script
createAdminSeed();
