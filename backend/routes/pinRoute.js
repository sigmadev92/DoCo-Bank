import express from "express";
import { setupPin, resetPin } from "../controllers/pinController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
console.log(`At pin Route`);
router.post("/setup", authMiddleware, setupPin);
router.post("/reset", authMiddleware, resetPin);

export default router;
