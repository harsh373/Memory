import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log("MONGO_URI not defined. Database connection skipped.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};

export default connectDB;
