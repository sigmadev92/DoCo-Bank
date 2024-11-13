import React from "react";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHistory,
  FaRegCreditCard,
  FaKey,
} from "react-icons/fa";
import HeroCover from "../images/bg3.jpeg";
import security1 from "../images/security1.png";
import security2 from "../images/security2.png";

export default function Home() {
  return (
    <div className="bg-white flex flex-col items-center">
      {/* Hero Section */}
      {/* Hero Section */}
      <div
        className="w-[98%] h-[60vh] opacity-96 bg-cover mt-4 ml-4 mr-4 bg-center flex flex-col justify-center items-center text-center text-white"
        style={{ backgroundImage: `url(${HeroCover})` }}
      >
        <h1 className="text-md sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 bg-black bg-opacity-55 py-1 px-2 text-yellow-50 mx-4">
          Grow Your Wealth, Secure Your Health with DoCo Bank!
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium bg-black bg-opacity-55 py-1 px-2 mx-4">
          Your trusted partner in financial growth & security.
        </p>
      </div>

      {/* Services Section */}
      <div className="w-[90%] mt-12 px-6 py-6 bg-gray-100 rounded-lg shadow-md border border-2px">
        <h2 className="text-3xl font-bold text-navy mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service: View Balance */}
          <Link
            to="/balance"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaWallet className="text-4xl  text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">View Balance</h3>
            <p className="text-gray-600 mt-2">
              Check your current balance in seconds!
            </p>
          </Link>

          {/* Service: Deposit */}
          <Link
            to="/deposit"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaRegCreditCard className="text-4xl text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">Deposit Money</h3>
            <p className="text-gray-600 mt-2">
              Deposit funds easily and instantly.
            </p>
          </Link>

          {/* Service: Withdraw Money */}
          <Link
            to="/withdraw"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaMoneyBillWave className="text-4xl text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">Withdraw Money</h3>
            <p className="text-gray-600 mt-2">
              Access your funds anytime, anywhere.
            </p>
          </Link>

          {/* Service: Transfer Funds */}
          <Link
            to="/transfer"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaExchangeAlt className="text-4xl text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">Transfer Funds</h3>
            <p className="text-gray-600 mt-2">Send money securely with ease.</p>
          </Link>

          {/* Service: Transaction History */}
          <Link
            to="/transactionHistory"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaHistory className="text-4xl text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">
              Transaction History
            </h3>
            <p className="text-gray-600 mt-2">
              Review all your past transactions.
            </p>
          </Link>

          {/* Service: Reset Digital Pin */}
          <Link
            to="/digitalPin"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 text-center group"
          >
            <FaKey className="text-4xl text-navy mb-4 group-hover:text-teal-500 transition" />
            <h3 className="text-xl font-semibold text-navy">
              Reset Digital Pin
            </h3>
            <p className="text-gray-600 mt-2">
              Securely reset your digital pin for enhanced security.
            </p>
          </Link>
        </div>
      </div>

      {/* Testimonials & Security Section */}
      <div className="w-[90%] mt-12 mb-12 px-6 py-12 bg-gray-100 rounded-lg shadow-md border border-2px ">
        <h2 className="text-3xl font-bold text-center text-navy mb-8">
          Why Choose DoCo Bank?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Testimonials */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-navy mb-4">Our Vision</h3>
            <p className="italic text-gray-700 mb-4">
              “DoCo Bank will change the financial game; <br />
              reliable service & security are our name!”
            </p>
            <h3 className="font-semibold text-navy">- VJ!</h3>
          </div>

          {/* Security Badges */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-navy mb-4">
              Your security is our top aim
            </h3>
            <p className="text-gray-600 mb-4">
              We use cutting-edge encryption to guard your info tight, <br />
              Protecting your finances day and night!
            </p>
            <div className="flex justify-center space-x-4">
              <img
                src={security1}
                alt="Security Badge 1"
                className="w-16 h-16"
              />
              <img
                src={security2}
                alt="Security Badge 2"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
