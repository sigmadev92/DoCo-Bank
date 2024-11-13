// import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import sendOtpEmail from "../services/registerEmailService.js";
import {
  generateOTP,
  generateUniqueAccountNumber,
} from "../services/helperFuntions.js";

// Request OTP Controller
export async function requestOtp(req, res) {
  const { email } = req.body;
  console.log(`backend : user Controller : request-Otp`);
  try {
    const otp = generateOTP();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await users.updateOne(
      { email: email },
      { tempOtp: otp, otpExpiration },
      { upsert: true } // Creates a record if not found
    );

    await sendOtpEmail(email, otp);

    res.status(200).json({ status: true, message: "OTP sent to email." });
  } catch (error) {
    console.error("Error in requestOtp:", error);
    res.status(500).json({ status: false, message: "OTP request failed." });
  }
}

// Verify OTP Controller
export async function verifyOtp(req, res) {
  console.log(`backend : user Controller : verify-Otp`);
  const { email, otp } = req.body;
  console.log(req.body);
  try {
    const user = await users.findOne({ email: email, tempOtp: otp });
    console.log(`backend : user Controller : verify-Otp : user : ${user}`);
    if (!user || user.otpExpiration < Date.now()) {
      return res.send({ status: false, message: "Invalid or expired OTP." });
    }

    await users.updateOne(
      { email },
      { otp: null, otpExpiration: null } // Clear OTP after verification
    );

    res
      .status(200)
      .json({ status: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res
      .status(500)
      .json({ status: false, message: "OTP verification failed." });
  }
}

// registerController -> First name, last name, Phone number, email, state, city, pinCode, Address, Password, Account number, DigitalPin, balance, Profile photo
export async function registerController(req, res) {
  console.log("Received registration request");

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    state,
    city,
    pinCode,
    address,
    password,
    digitalPin,
  } = req.body;
  console.log("user controller testing: ", req.body);
  try {
    console.log("Finding user by email...");
    const user = await users.findOne({ email });

    if (!user) {
      console.log("User not found, cannot register.");
      return res.send({ status: false, message: "User not found." });
    }

    console.log("Hashing password and digital pin...");
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedDigitalPin = await bcrypt.hash(digitalPin, 10);

    console.log("Generating account number...");
    const accountNumber = await generateUniqueAccountNumber(); // Ensure this is awaited

    console.log("Saving user...");
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.state = state;
    user.city = city;
    user.pinCode = pinCode;
    user.address = address;
    user.password = hashedPassword;
    user.digitalPin = hashedDigitalPin;
    user.accountNumber = accountNumber; // Save account number
    user.balance = 0; // Initial balance
    user.tempOtp = null; // Clear OTP after registration
    // Check if a profile photo is uploaded and save its path
    if (req.file) {
      user.profilePhoto = req.file.path;
    }

    await user.save();
    console.log("User registered successfully.");
    res.send({ status: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.send({ status: false, message: "Error during registration." });
  }
}

// login controller -> accountNumber, phoneNumber or email, password
export async function loginController(req, res) {
  console.log(`userController : login`);
  const { accountNumber, phoneNumber, email, password } = req.body;

  try {
    // Find the user by account number, phone number, or email
    const user = await users.findOne({
      $or: [{ accountNumber }, { phoneNumber }, { email }],
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found. Please register first.",
      });
    }

    // Compare entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload can include user details
      process.env.JWT_SECRET, // Use the secret from your .env file
      { expiresIn: "1h" } // Token expiration time
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      userDetails: {
        userId: user._id,
        accountNumber: user.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        token: token, // Include the token in the response
      },
    });
  } catch (error) {
    console.error(`userController : login controller : error : ${error}`);
    res.status(500).json({
      status: false,
      message: "Something went wrong during login.",
    });
  }
}

// forgot password
export async function forgotPasswordController(req, res) {
  console.log(`userController : forgot password`);
  const { email, accountNumber, newPassword } = req.body;

  try {
    // Find the user by email or account number
    const user = await users.findOne({
      $or: [{ email }, { accountNumber }],
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found. Please check your details.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    console.log("Password reset successful");
    res.status(200).json({
      status: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(
      `userController : forgot password controller : error : ${error}`
    );
    res.status(500).json({
      status: false,
      message: "Something went wrong while resetting the password.",
    });
  }
}
