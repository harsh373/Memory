import { Request, Response } from "express";
import Event from "../models/Event";
import slugify from "slugify";
import cloudinary from "../config/cloudinary";


export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      year,
      date,
      description
    } = req.body;

   
    if (!name || !category || !year || !date) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

   
    if (!req.file) {
      return res.status(400).json({
        message: "Cover image is required"
      });
    }

    
    const slug = slugify(name, {
      lower: true,
      strict: true
    });

    
    const alreadyExists = await Event.findOne({ slug });
    if (alreadyExists) {
      return res.status(409).json({
        message: "Event already exists"
      });
    }

   
    const uploadResult = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "events/covers"
      }
    );

    
    const event = await Event.create({
      name,
      slug,
      category,
      year,
      date,
      description,
      coverImageUrl: uploadResult.secure_url
    });

    
    return res.status(201).json(event);

  } catch (error) {
    console.error("Create event error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};


export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    return res.json(events);
  } catch (error) {
    console.log("Get all events error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getEventBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(event);
  } catch (error) {
    console.log("Get event by slug error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUpcomingEvent = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    const upcomingEvent = await Event.find({
      date: { $gt: now }
    })
      .sort({ date: 1 })
      .select(
        "name slug date coverImageUrl description"
      )
      .lean();
     return res.status(200).json({ events: upcomingEvent });

    
  } catch (error) {
    console.error("Get upcoming event error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};


export const updateEventCover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  
    if (!req.file) {
      return res.status(400).json({
        message: "Cover image file is required"
      });
    }

   
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    
    const uploadResult = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "events/covers"
      }
    );

   
    event.coverImageUrl = uploadResult.secure_url;
    await event.save();

    return res.status(200).json(event);

  } catch (error) {
    console.error("Update event cover error:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
