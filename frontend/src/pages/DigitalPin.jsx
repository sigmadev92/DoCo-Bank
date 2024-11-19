import React from "react";
import { Link } from "react-router-dom";

export default function DigitalPin() {
  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Digital Pin
        </h1>

        {/* Digital Pin Display */}
        <div className="mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
            Your Current Digital Pin
          </h2>
          <div className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center">
            ****
          </div>
        </div>

        {/* Reset Digital Pin Section */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center ">
            Reset Your Digital Pin
          </h2>

          <div className="space-y-2">
            {/* Current Pin Input */}
            <input
              type="password"
              placeholder="Enter Current Pin"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />

            {/* New Pin Input */}
            <input
              type="password"
              placeholder="Enter New Pin"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />

            {/* Confirm New Pin Input */}
            <input
              type="password"
              placeholder="Confirm New Pin"
              className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
              required
            />
          </div>

          {/* Reset Button */}
          <button className="bg-navy text-white w-full p-2 rounded text-sm sm:text-base">
            Reset Digital Pin
          </button>

          {/* Back Link */}
          <div className="text-center mt-4 space-y-2">
            <Link
              to="/"
              className="text-sm text-navy-blue hover:underline block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
