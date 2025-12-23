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


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/picture-of-the-day", dailyHighLightRoutes);


app.post("/ping", (_req, res) => {
  res.json({ ok: true });
});


app.get("/", (_req, res) => {
  res.send("Backend is running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
