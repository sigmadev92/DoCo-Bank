import mongoose from "mongoose";

// fields - FirstName, LastName, Email, PhoneNumber, state,city , pincode , Address, Password, AccoundNumber, DigitalPin, Balance, Profile
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      unique: true,
    },
    digitalPin: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const users = mongoose.model("users", UserSchema);

export default users;
