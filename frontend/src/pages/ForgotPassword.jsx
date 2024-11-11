import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <form className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ">
        {/* Form Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Forgot Password
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
          Lost Your Way? DoCo's Here to Save the Day!
        </h2>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
          required
        />

        {/* Reset Password Button */}
        <button
          type="submit"
          className="bg-navy text-white w-full p-2 rounded text-sm sm:text-base"
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
