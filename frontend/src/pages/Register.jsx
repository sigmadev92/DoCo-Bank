import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userUrl } from "../api/URL";
import axios from "axios";

export default function Register() {
  const [step, setStep] = useState(1);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    pinCode: "",
    address: "",
    password: "",
    digitalPin: "",
    tempOtp: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  console.log(errors);

  // Function to handle OTP request
  const handleGetOtp = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      toast.error("Email is required!");
      return;
    }
    try {
      const response = await fetch(`${userUrl}/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      console.log(`register : handleGetOtp : response : ${response}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(`register : handleGetOtp : data : ${data}`);
      if (data.status) {
        setOtpRequested(true);
        toast.success("OTP sent to your email.");
      } else {
        toast.error("Error sending OTP.");
      }
    } catch (error) {
      console.log("Error requesting OTP:", error);
      toast.error("Error requesting OTP.");
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${userUrl}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      console.log(`register : handleVerifyOtp : response : `, otp);
      console.log(`register : handleVerifyOtp : response : ${response}`);

      const data = await response.json();
      console.log(`register : handleVerifyOtp : data : ${data}`);

      if (data.status) {
        setOtpVerified(true);
        console.log("OTP verified successfully.");
        toast.success("OTP verified successfully.");
      } else {
        console.log("Invalid or expired OTP.");
        toast.error("Invalid or expired OTP.");
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      toast.error("Error verifying OTP:", error);
    }
  };

  // Function to handle input change
  function handleChange(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (step === 2) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.pinCode) newErrors.pinCode = "Pincode is required";
      if (!formData.address) newErrors.address = "Address is required";
    }
    if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.digitalPin)
        newErrors.digitalPin = "Digital pin is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In Register.js (frontend component)
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit: Starting form submission...");

    // Validate form before submitting
    if (!validate()) {
      console.log("handleSubmit: Validation failed.");
      toast.error("Please fill out all required fields.");
      return;
    }

    console.log("handleSubmit: Validation passed.");
    console.log("handleSubmit: formData =", formData);

    // Prepare FormData with form data and profile photo
    const formDataToSubmit = new FormData();

    // Append all fields in formData to formDataToSubmit
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append files (profile photo)
    files.forEach((file) => {
      formDataToSubmit.append("profilePhoto", file);
    });

    // Log FormData contents to verify they were appended correctly
    console.log("handleSubmit: FormData contents:");
    for (let pair of formDataToSubmit.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      console.log("handleSubmit: Sending form data to backend...");

      const response = await axios.post(
        `${userUrl}/register`,
        formDataToSubmit
      );

      if (response.data.status) {
        console.log("handleSubmit: Registration successful.");
        toast.success("Registered Successfully!");
        Navigate("/login");
      } else {
        console.log(
          `handleSubmit: Registration failed. Message: ${response.data.message}`
        );
        toast.error(
          `Email or Phone Number already registered. ${response.data.message}`
        );
      }
    } catch (error) {
      console.log("handleSubmit: Error during registration:", error);
      toast.error("Pineline error! Please try again.");
    }
  }

  // Function to move to the next step
  const nextStep = () => {
    if (validate() && (step !== 1 || (otpRequested && otpVerified))) {
      setStep(step + 1);
    }
  };

  // Function to go back to the previous step
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-100 min-h-[70.70vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[70.70vh] overflow-y-auto"
      >
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <div className="relative w-full mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
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
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              name="digitalPin"
              value={formData.digitalPin}
              onChange={handleChange}
              placeholder="Digital Pin"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="file"
              name="profilePic"
              className="w-full p-3 mb-4 border rounded"
              required
              onChange={(e) => setFiles(Array.from(e.target.files))}
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
