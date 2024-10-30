import { validatePin } from "../controllers/pinController.js";

// backend/middleware/pinMiddleware.js
export const validatePinMiddleware = async (req, res, next) => {
  console.log(`pin Middleware : validate Pin Middleware`);
  const userIdentifier = req.body.userId || req.body.fromUserId;
  const digitalPin = req.body.digitalPin;

  if (!userIdentifier || !digitalPin) {
    return res
      .status(403)
      .json({ message: "User ID and digital PIN are required" });
  }

  const isValid = await validatePin(userIdentifier, digitalPin);
  if (!isValid) {
    return res.status(403).json({ message: "Invalid PIN" });
  }

  next();
};
