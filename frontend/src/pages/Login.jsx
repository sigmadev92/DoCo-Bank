import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <form className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ">
        {/* Form Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Login
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          Time to Grow? Dive into DoCo!
        </h2>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-navy text-white w-full p-2 rounded text-sm sm:text-base"
        >
          Login
        </button>

        {/* Links for Forgot Password and Register */}
        <div className="text-center mt-4 space-y-2">
          <Link
            to="/forgotPassword"
            className="text-xs sm:text-sm md:text-base text-navy-blue hover:underline block"
          >
            Forgot Password?
          </Link>
          <p className="text-xs sm:text-sm md:text-base">
            New User?{" "}
            <Link to="/register" className="text-navy-blue hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
