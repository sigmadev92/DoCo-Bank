// backend/routes/userRoute.js
import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  verifyOtp,
  requestOtp,
} from "../controllers/userController.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../library/Multer.js";

const router = express.Router();

console.log(`At user Route`);

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", upload.single("profilePhoto"), registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

export default router;
