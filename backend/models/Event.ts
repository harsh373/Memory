import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    category: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    description: {
      type: String
    },

    coverImageUrl: {
      type: String
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;
