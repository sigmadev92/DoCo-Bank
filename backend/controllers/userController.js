// import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Helper function to generate a unique 14-digit account number
async function generateUniqueAccountNumber() {
  let accountNumber;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random 14-digit number
    accountNumber = Math.floor(
      10000000000000 + Math.random() * 90000000000000
    ).toString();

    // Check if the generated account number already exists in the database
    const existingUser = await users.findOne({ accountNumber });
    if (!existingUser) {
      isUnique = true; // Exit loop if account number is unique
    }
  }

  return accountNumber;
}

// Helper function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random number
}

// register controller -> First name, last name, Phone number, email, state, city, pinCode, Address, Password, Account number, DigitalPin, balance, Profile photo
export async function registerController(req, res) {
  console.log(`userController : register`);
  try {
    // Check if the user already exists by email or phone number
    const UserAlreadyExist = await users.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (UserAlreadyExist) {
      console.log("Email or Phone Number already registered");
      return res.status(400).json({
        status: false,
        message: "User already exists!",
      });
    }

    // Hash password and digital PIN
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedDigitalPin = await bcrypt.hash(req.body.digitalPin, 10);

    // Generate a unique 14-digit account number
    const accountNumber = await generateUniqueAccountNumber();

    // Generate a 6-digit OTP and set expiration time (e.g., 10 minutes from now)
    const otp = generateOTP();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Create new user with hashed credentials
    const newUser = new users({
      ...req.body,
      password: hashedPassword,
      digitalPin: hashedDigitalPin,
      accountNumber: accountNumber,
      otp: otp,
      otpExpiration: otpExpiration,
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(`userController : register controller : error : ${error}`);
    res.status(500).json({
      status: false,
      message: "Something went wrong in the database.",
    });
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
