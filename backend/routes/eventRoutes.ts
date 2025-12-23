import express from "express";
import requireAdmin from "../middlewares/authMiddleware";
import {
  createEvent,
  getAllEvents,
  getEventBySlug
} from "../controllers/eventController";
import upload from "../config/multer";

const router = express.Router();


router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);


router.post(
  "/",
  requireAdmin,
  upload.single("coverImage"),
  createEvent
);

export default router;
