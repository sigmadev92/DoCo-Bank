import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userUrl } from "../api/URL";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  // State Variables
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [forgotPasswordOtpRequested, setForgotPasswordOtpRequested] =
    useState(false);
  const [forgotPasswordOtpVerified, setForgotPasswordOtpVerified] =
    useState(false);
  const Navigate = useNavigate();

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetOtp = async () => {
    try {
      const response = await axios.post(
        `${userUrl}/request-forgot-password-otp`,
        { email: formData.email }
      );
      if (response.data.status) {
        setForgotPasswordOtpRequested(true);
        toast.success("OTP has been sent to your email!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${userUrl}/verify-forgot-password-otp`,
        { email: formData.email, otp }
      );
      if (response.data.status) {
        setForgotPasswordOtpVerified(true);
        toast.success("OTP verified successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!forgotPasswordOtpVerified) {
      toast.error("Please verify OTP before resetting your password.");
      return;
    }

    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(`${userUrl}/forgot-password`, {
        email: formData.email,
        password,
      });

      if (response.data.status) {
        toast.success("Password reset successful!");
        Navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        {/* Form Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Forgot Password
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
          Lost Your Way? DoCo's Here to Save the Day!
        </h2>

        {/* Email Field */}
        <div className="relative w-full mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
            disabled={forgotPasswordOtpRequested && forgotPasswordOtpVerified}
          />
          {!forgotPasswordOtpRequested && (
            <button
              type="button"
              onClick={handleGetOtp}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-navy text-white px-3 py-1 rounded"
            >
              Get OTP
            </button>
          )}
        </div>

        {/* OTP Field */}
        {forgotPasswordOtpRequested && !forgotPasswordOtpVerified && (
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-navy text-white px-3 py-1 rounded"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* New Password Fields */}
        {forgotPasswordOtpVerified && (
          <>
            <div className="w-full mb-4">
              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Reset Password Button */}
        <button
          type="submit"
          className="bg-navy text-white w-full p-2 rounded text-sm sm:text-base"
          disabled={!forgotPasswordOtpVerified}
        >
          Reset Password
        </button>

        {/* Link to Login */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-xs sm:text-sm md:text-base">
            Remembered your password?{" "}
            <Link to="/login" className="text-navy-blue hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
