import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { accountUrl } from "../api/URL";
import { WithDraw_BALANCE } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function WithDraw() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (event) => {
    event.preventDefault();

    try {
      // Validate withdrawal amount
      const withdrawAmount = parseFloat(amount);
      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        setMessage("Please enter a valid withdrawal amount.");
        return;
      }

      if (withdrawAmount > userData.balance) {
        setMessage("Insufficient balance.");
        return;
      }

      // Make API request to process withdrawal
      const response = await axios.post(`${accountUrl}/withdraw`, {
        userId: userData._id,
        amount: withdrawAmount, // Match the field expected by the backend
      });

      if (response.status === 200) {
        // Update Redux state and clear inputs
        dispatch(
          WithDraw_BALANCE({
            WithDraw_New_amount: userData.balance - withdrawAmount,
          })
        );
        setAmount("");
        toast.success(`Successfully withdrawn ₹${withdrawAmount.toFixed(2)}.`);
        setMessage(`Successfully withdrawn ₹${withdrawAmount.toFixed(2)}.`);
      }
    } catch (error) {
      toast.error("Something went wrong during withdrawal!");
      console.error("Withdraw Error:", error);
    }
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
