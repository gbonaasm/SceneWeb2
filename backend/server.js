import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import filmRoutes from "./routes/filmRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("API running..."));

// Routes
app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
