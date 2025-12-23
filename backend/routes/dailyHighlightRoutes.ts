import express from "express"
import requireAdmin from "../middlewares/authMiddleware";

import { getPictureOfTheDay, regeneratePictureOfTheDay } from "../controllers/dailyHighlightContoller"

const router = express.Router()

router.get("/", getPictureOfTheDay);
router.post("/regenerate", requireAdmin, regeneratePictureOfTheDay);

export default router


