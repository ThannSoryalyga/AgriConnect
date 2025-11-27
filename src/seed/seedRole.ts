import mongoose from "mongoose"; // Import mongoose to connect to MongoDB
import dotenv from "dotenv"; // Import dotenv to read environment variables
import roleModel from "../models/roleModel"; // Import Role model

dotenv.config(); // Load variables from .env file

const MONGO_URI = process.env.MONGO_URI || ""; // MongoDB connection string

async function seedRoles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Roles we want to add to the database
    const roles = ["Admin", "Customer", "Farmer"];

    // Loop through each role
    for (const roleName of roles) {
      // Find role by name. If it exists, update it; if not, create it (upsert)
      const role = await roleModel.findOneAndUpdate(
        { name: roleName }, // search filter
        { name: roleName }, // data to update or insert
        { new: true, upsert: true } // options: return the new doc, create if not exist
      );
      console.log(`Role created/updated: ${role.name}`);
    }

    console.log("All roles seeded successfully!");
    process.exit(0); // Exit the script successfully
  } catch (err) {
    console.error("Error seeding roles:", err);
    process.exit(1); // Exit the script with error
  }
}

// Run the seed function
seedRoles();
