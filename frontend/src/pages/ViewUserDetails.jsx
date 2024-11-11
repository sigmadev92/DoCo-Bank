import React from "react";
import { Link } from "react-router-dom";
export default function ViewUserDetails() {
  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center">
          User Details
        </h1>

        {/* Profile Photo */}
        <div className="flex justify-center mt-6">
          <img
            src="#"
            alt="img"
            // src={user.profilePhoto}
            // alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full border"
          />
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">First Name:</span>
            {/* <span>{user.firstName}</span> */}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Last Name:</span>
            {/* <span>{user.lastName}</span> */}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Email:</span>
            {/* <span>{user.email}</span> */}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Phone Number:</span>
            {/* <span>{user.phoneNumber}</span> */}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Address:</span>
            <span>
              {/* {user.address}, {user.city}, {user.state} - {user.pinCode} */}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Account Number:</span>
            {/* <span>{user.accountNumber}</span> */}
          </div>

          <div className="text-center mt-4 space-y-2">
            <p className="text-sm">
              Edit User Details?{" "}
              <Link
                to="/editUserDetails"
                className="text-navy-blue hover:underline"
              >
                Edit Details
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
