import dotenv from "dotenv";
dotenv.config();

import "./config/cloudinary";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import photoRoutes from "./routes/photoRoutes";
import dailyHighLightRoutes from "./routes/dailyHighlightRoutes";

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

app.use(async (_req, _res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/picture-of-the-day", dailyHighLightRoutes);

export default app;
