import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// This is a placeholder for balance data. Replace with API call or actual data fetching logic
const mockBalance = 1500.75;

export default function WithDraw() {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate data fetching for balance
    setBalance(mockBalance);
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();

    // Check if amount is valid
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (withdrawAmount > balance) {
      setMessage("Insufficient balance.");
      return;
    }

    // Simulate successful withdrawal
    setBalance(balance - withdrawAmount);
    setMessage(`Successfully withdrawn ₹${withdrawAmount.toFixed(2)}.`);
    setAmount(""); // Reset the amount field
  };

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ">
        {/* Page Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Withdraw Funds
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          Time to withdraw? It’s easy, that's for sure!
        </h2>

        {/* Withdraw Form */}
        <form onSubmit={handleWithdraw}>
          <input
            type="number"
            placeholder="Amount to Withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-sm sm:text-base"
            required
            min="1"
            step="0.01"
          />

          {/* Withdraw Button */}
          <button
            type="submit"
            className="bg-navy text-white w-full p-2 rounded text-sm sm:text-base"
          >
            Withdraw
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="text-center mt-4 text-sm text-red-600">{message}</div>
        )}

        {/* Link to return to previous page */}
        <div className="text-center mt-4 space-y-2">
          <Link
            to="/ "
            className="text-sm text-navy-blue hover:underline block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
