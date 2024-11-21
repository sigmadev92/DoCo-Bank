import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userUrl } from "../api/URL";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditUserDetails() {
  // Access the user data from the Redux store
  const user = useSelector((state) => state.user.userData);
  const Navigate = useNavigate();
  // Initialize state for form fields using user's current details
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    pinCode: user.pinCode || "",
    accountNumber: user.accountNumber || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated User Details:", formData);

    try {
      // Include the userId in the request body (from Redux or another source)
      const response = await axios.put(`${userUrl}/editUserDetails`, {
        userId: user._id, // Assuming `user` is retrieved from Redux
        ...formData,
      });

      if (response.data.status) {
        toast.success(
          response.data.message || "User details updated successfully!"
        );
        Navigate("/ViewUserDetails");
      } else {
        toast.error(response.data.message || "Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[80vh] max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-4 uppercase text-center">
          Edit User Details
        </h1>

        {/* Edit Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Account Number
          <div className="flex flex-col">
            <label htmlFor="accountNumber" className="font-bold text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>  */}
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-bold text-gray-800">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-bold text-gray-800">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* Email */}
          {/* <div className="flex flex-col">
            <label htmlFor="email" className="font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div> */}

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="font-bold text-gray-800">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-bold text-gray-800">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="font-bold text-gray-800">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="font-bold text-gray-800">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
              required
            />
          </div>

          {/* Pin Code */}
          <div className="flex flex-col">
            <label htmlFor="pinCode" className="font-bold text-gray-800">
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="p-2 border rounded font-semibold text-gray-700"
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
