import mongoose from "mongoose";

export type PhotoType = {
  eventId: mongoose.Types.ObjectId;
  imageUrl: string;
  cloudinaryPublicId: string;
  eligibleForDaily: boolean;
  uploadedAt: Date;
};

const PhotoSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    cloudinaryPublicId: {
      type: String,
      required: true
    },

    eligibleForDaily: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: { createdAt: "uploadedAt", updatedAt: false }
  }
);

const Photo = mongoose.model("Photo", PhotoSchema);

export default Photo;
