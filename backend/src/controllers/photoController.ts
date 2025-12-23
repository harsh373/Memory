import { Request, Response } from "express";
import Photo from "../models/Photo";

export const uploadPhotos = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const files = req.files as any[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const photos = files.map(file => ({
      eventId,
      imageUrl: file.path,                 
      cloudinaryPublicId: file.filename    
    }));

    const savedPhotos = await Photo.insertMany(photos);

    return res.status(201).json(savedPhotos);
  } catch (error) {
    console.log("Photo upload failed:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getPhotosByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID required" });
    }

    const photos = await Photo.find({ eventId })
      .sort({ uploadedAt: -1 });

    return res.json(photos);
  } catch (error) {
    console.log("Get photos by event error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};