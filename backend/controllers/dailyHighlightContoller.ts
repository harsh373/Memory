import { Request, Response } from "express";
import Photo from "../models/Photo";
import DailyHighlight from "../models/DailyHighlight";

// PUBLIC: get picture of the day
export const getPictureOfTheDay = async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    
    const existing = await (DailyHighlight as any).findOne({ date: today });

    if (existing && existing.photoId) {
      const photo = await (Photo as any).findById(existing.photoId);
      return res.json(photo);
    }

   
    const allPhotos = await (Photo as any).find();

   
    const eligiblePhotos = allPhotos.filter(
      (photo: any) => photo.eligibleForDaily !== false
    );

    if (eligiblePhotos.length === 0) {
      return res.json(null);
    }

    
    const randomPhoto =
      eligiblePhotos[Math.floor(Math.random() * eligiblePhotos.length)];

    
    await (DailyHighlight as any).create({
      photoId: randomPhoto._id,
      date: today
    });

    return res.json(randomPhoto);
  } catch (error) {
    console.log("Picture of the day error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: regenerate today's picture
export const regeneratePictureOfTheDay = async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    await (DailyHighlight as any).deleteOne({ date: today });

    return res.json({ message: "Picture of the day regenerated" });
  } catch (error) {
    console.log("Regenerate error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
