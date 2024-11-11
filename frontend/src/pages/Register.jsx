import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  // Function to handle OTP request
  const handleGetOtp = () => {
    setOtpRequested(true);
    // Call the backend API to send OTP to the entered email
    // Example: axios.post("/send-otp", { email }).then(response => ...)
  };

  // Function to verify OTP
  const handleVerifyOtp = () => {
    // Check OTP with backend
    // Example: axios.post("/verify-otp", { otp }).then(response => ...)
    setOtpVerified(true); // Assuming OTP is correct for demonstration
  };

  // Function to move to the next step
  const nextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  // Function to go back to the previous step
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-100 min-h-[70.70vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[70.70vh] overflow-y-auto">
        <h1 className="bg-navy text-white w-full p-2 mb-4 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Register
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
          For Dreams to Grow, Choose DoCo!
        </h2>

        {/* Progress Tracker */}
        <div className="flex justify-between mb-4">
          <div
            className={`w-1/3 h-2 ${step >= 1 ? "bg-navy" : "bg-gray-300"}`}
          />
          <div
            className={`w-1/3 h-2 ${step >= 2 ? "bg-navy" : "bg-gray-300"}`}
          />
          <div
            className={`w-1/3 h-2 ${step >= 3 ? "bg-navy" : "bg-gray-300"}`}
          />
        </div>

        {/* Step Headers */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          {step === 1 && "Personal Information"}
          {step === 2 && "Location Information"}
          {step === 3 && "Account Information"}
        </h2>

        {/* Form Steps */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <div className="relative w-full mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
                disabled={otpRequested && otpVerified}
              />
              {!otpRequested && (
                <button
                  type="button"
                  onClick={handleGetOtp}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-navy text-white px-3 py-1 rounded"
                >
                  Get OTP
                </button>
              )}
            </div>

            {otpRequested && !otpVerified && (
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
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="State"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              placeholder="Address"
              className="w-full p-2 mb-4 border rounded"
              required
            ></textarea>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Digital Pin"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="file"
              className="w-full p-3 mb-4 border rounded"
              required
            />
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 w-full p-2 rounded mr-2"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={step === 1 && (!otpRequested || !otpVerified)}
              className={`w-full p-2 rounded ml-2 ${
                step === 1 && (!otpRequested || !otpVerified)
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-navy text-white"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-navy text-white w-full p-2 rounded"
            >
              Register
            </button>
          )}
        </div>

        {/* Link to Login */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-navy-blue hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
