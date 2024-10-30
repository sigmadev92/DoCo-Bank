import mongoose from "mongoose";

// Schema for storing and managing digital PINs
const PinSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    digitalPin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", PinSchema);

export default Pin;
