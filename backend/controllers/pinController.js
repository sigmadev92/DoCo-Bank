import Pin from "../models/pinModel.js";
import bcrypt from "bcrypt";

// Set up a digital PIN
export const setupPin = async (req, res) => {
  console.log(`pin Controller : setup pin`);
  const { userId, digitalPin } = req.body;
  try {
    const hashedPin = await bcrypt.hash(digitalPin, 10);
    const pin = new Pin({ userId, digitalPin: hashedPin });
    await pin.save();
    res.status(200).json({ message: "PIN setup successful" });
  } catch (error) {
    res.status(500).json({ message: "Error setting up PIN", error });
  }
};

// Reset digital PIN
export const resetPin = async (req, res) => {
  console.log(`pin Controller : reset pin`);
  const { userId, newDigitalPin } = req.body;
  try {
    const hashedPin = await bcrypt.hash(newDigitalPin, 4);
    await Pin.findOneAndUpdate({ userId }, { digitalPin: hashedPin });
    res.status(200).json({ message: "PIN reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting PIN", error });
  }
};

// Validate digital PIN
export const validatePin = async (userId, digitalPin) => {
  console.log(`pin Controller : Validate pin`);
  const pinRecord = await Pin.findOne({ userId });
  if (!pinRecord) {
    return false;
  }
  const response = await bcrypt.compare(digitalPin, pinRecord.digitalPin);
  return response;
};
