import mongoose from "mongoose";

const DailyHighlightSchema = new mongoose.Schema(
  {
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      required: true
    },
    date: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const DailyHighlight = mongoose.model("DailyHighlight", DailyHighlightSchema);

export default DailyHighlight;
