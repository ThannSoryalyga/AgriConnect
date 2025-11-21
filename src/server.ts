import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import { swaggerSetup } from "./config/swagger";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Swagger
swaggerSetup(app);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs: http://localhost:${PORT}/api`);
});
