import express from "express";
import requireAdmin from "../middlewares/authMiddleware";
import {
  createEvent,
  getAllEvents,
  getEventBySlug,
  getUpcomingEvent,
  updateEventCover
} from "../controllers/eventController";
import upload from "../config/multer";

const router = express.Router();




router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvent);
router.get("/:slug", getEventBySlug);



router.post(
  "/",
  requireAdmin,
  upload.single("coverImage"),
  createEvent
);

router.put(
  "/:id/cover",
  requireAdmin,
  upload.single("cover"),
  updateEventCover
);

export default router;
