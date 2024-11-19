// backend/routes/userRoute.js
import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  verifyOtp,
  requestOtp,
  getCurrentUserDetails,
  verifyDigitalPin,
  editUserDetails
} from "../controllers/userController.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../library/Multer.js";

const router = express.Router();

console.log(`At user Route`);

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", upload.single("profilePhoto"), registerController);

router.post("/login", loginController);
// @ redux route
router.get("/get-current-user-details/:userId", getCurrentUserDetails);

router.post("/verifyDigitalPin", verifyDigitalPin);

router.put("/editUserDetails", editUserDetails);

router.post("/forgot-password", forgotPasswordController);

export default router;
