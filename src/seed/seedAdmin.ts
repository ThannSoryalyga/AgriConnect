// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import connectDB from "../config/database";
// import { RoleModel } from "../models/roleModel";
// import { UserModel } from "../models/userModel";
// import { UserRoleModel } from "../models/userRole";

// dotenv.config();

// const seedAdmin = async () => {
//   try {
//     await connectDB();

//     const roles = ["admin", "farmer", "customer"];
//     for (const name of roles) {
//       await RoleModel.findOneAndUpdate(
//         { name },
//         { name },
//         { upsert: true, new: true }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(
//       process.env.ADMIN_PASSWORD || "admin123",
//       10
//     );

//     const adminUser = await UserModel.findOneAndUpdate(
//       { email: process.env.ADMIN_EMAIL || "admin@example.com" },
//       {
//         full_name: process.env.ADMIN_FULLNAME || "Admin User",
//         email: process.env.ADMIN_EMAIL || "admin@example.com",
//         phone: process.env.ADMIN_PHONE || "0123456789",
//         password: hashedPassword,
//         role: "admin",
//         created_by: "system",
//       },
//       { upsert: true, new: true }
//     );

//     const adminRole = await RoleModel.findOne({ name: "admin" });

//     await UserRoleModel.findOneAndUpdate(
//       { user_id: adminUser._id, role_id: adminRole!._id },
//       { user_id: adminUser._id, role_id: adminRole!._id },
//       { upsert: true, new: true }
//     );

//     console.log("🎉 Admin + roles seeded!");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedAdmin();
