import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { accountUrl } from "../api/URL"; // Adjust import path as needed
import { Transfer_BALANCE } from "../redux/slices/userSlice"; // Adjust import path as needed

export default function Transfer() {
  const user = useSelector((state) => state.user.userData); // Get user data from Redux store
  const dispatch = useDispatch();

  const [recipientEmail, setRecipientEmail] = useState(""); // Use email for recipient
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setMessage("Please enter a valid transfer amount.");
      return;
    }

    if (transferAmount > user.balance) {
      setMessage("Insufficient balance.");
      return;
    }

    if (!recipientEmail || !/\S+@\S+\.\S+/.test(recipientEmail)) {
      setMessage("Please enter a valid recipient email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${accountUrl}/transfer`, {
        fromUserId: user._id,
        recipientEmail, // Pass email instead of user ID
        amount: transferAmount,
      });

      if (response.data && response.data.message === "Transfer successful") {
        dispatch(
          Transfer_BALANCE({
            Transfer_New_amount: user.balance - transferAmount,
          })
        );

        setMessage(
          `Successfully transferred ₹${transferAmount.toFixed(
            2
          )} to ${recipientEmail}.`
        );
        setRecipientEmail("");
        setAmount("");
      } else {
        setMessage(response.data.message || "Transfer failed.");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setMessage("An error occurred during the transfer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Transfer Funds
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          "Send money with ease, to anyone you please!"
        </h2>

        <div className="text-center mb-6">
          <p className="text-sm sm:text-base md:text-lg font-medium">
            Current Balance:{" "}
            <span className="text-green-600 font-semibold">
              ₹{user?.balance?.toFixed(2) || "0.00"}
            </span>
          </p>
        </div>

        <form onSubmit={handleTransfer}>
          <input
            type="email"
            placeholder="Recipient Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
            required
          />

          <input
            type="number"
            placeholder="Amount to Transfer"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
            required
            min="1"
            step="0.01"
          />

          <button
            type="submit"
            className={`w-full p-2 rounded text-sm sm:text-base ${
              loading
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-navy text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>

        {message && (
          <div className="text-center mt-4 text-sm text-red-600">{message}</div>
        )}

        <div className="text-center mt-4 space-y-2">
          <Link to="/" className="text-sm text-navy-blue hover:underline block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
