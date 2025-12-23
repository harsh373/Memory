import express from "express";
import requireAdmin from "../middlewares/authMiddleware";
import upload from "../config/multer";
import { uploadPhotos ,getPhotosByEvent } from "../controllers/photoController";

const router = express.Router();

router.get("/:eventId", getPhotosByEvent);



router.post(
  "/",
  requireAdmin,
  upload.array("photos", 10),
  uploadPhotos
);

export default router;
