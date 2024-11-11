import React from "react";

export default function EditUserDetails() {
  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[80vh] max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-4 uppercase text-center">
          Edit User Details
        </h1>

        {/* Edit Form */}
        <form className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-bold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-bold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="font-bold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-bold text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="font-bold text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="font-bold text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Pin Code */}
          <div className="flex flex-col">
            <label htmlFor="pinCode" className="font-bold text-gray-700">
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Account Number */}
          <div className="flex flex-col">
            <label htmlFor="accountNumber" className="font-bold text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-navy text-white w-full p-2 rounded mt-4"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}
