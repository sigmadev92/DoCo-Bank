// src\pages\TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { accountUrl } from "../api/URL";

export default function TransactionHistory() {
  // Access user data and dispatch function from Redux
  const user = useSelector((state) => state.user);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const userId = user?.userData?._id;

        if (!userId) {
          setError("User ID unavailable.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${accountUrl}/mini-statement/${userId}`
        );
        if (response.data.status) {
          setTransactions(response.data.data);
        } else {
          setError("Unable to fetch transactions. Try again later.");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-[25rem] sm:max-w-[35rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[74rem]">
        {/* Page Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Transaction History
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          "Here are your transactions, in clear action!"
        </h2>

        {/* Scrollable Transaction Table */}
        <div className="max-h-72 overflow-y-auto border">
          {loading ? (
            <div className="text-center text-gray-600 py-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-4">{error}</div>
          ) : (
            <table className="w-full table-auto text-left mb-6 px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-navy-blue font-semibold text-base lg:text-lg sm:text-xs md:text-md">
                    Date
                  </th>
                  <th className="px-4 py-2 text-navy-blue font-semibold text-base lg:text-lg sm:text-xs md:text-md">
                    Type
                  </th>
                  <th className="px-4 py-2 text-navy-blue font-semibold text-base lg:text-lg sm:text-xs md:text-md">
                    Amount (₹)
                  </th>
                  <th className="px-4 py-2 text-navy-blue font-semibold text-base lg:text-lg sm:text-xs md:text-md">
                    Balance After
                  </th>
                  <th className="px-4 py-2 text-navy-blue font-semibold text-base lg:text-lg sm:text-xs md:text-md">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction._id} className="border-t">
                      <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </td>
                      <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                        ₹{transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                        ₹{transaction.balanceAfterTransaction.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                        {transaction.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-sm text-gray-600"
                    >
                      No transactions available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-4 space-y-2">
          <Link to="/" className="text-sm text-navy-blue hover:underline block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
