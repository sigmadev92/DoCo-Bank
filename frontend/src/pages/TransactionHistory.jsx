import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Mock transaction data (simulated for this example)
const mockTransactions = [
  {
    id: 1,
    date: "2024-11-01",
    type: "Transfer",
    amount: 500.0,
    balanceAfter: 1000.75,
  },
  {
    id: 2,
    date: "2024-10-28",
    type: "Deposit",
    amount: 1000.0,
    balanceAfter: 1500.75,
  },
  {
    id: 3,
    date: "2024-10-25",
    type: "Transfer",
    amount: 200.0,
    balanceAfter: 500.75,
  },
  {
    id: 4,
    date: "2024-10-20",
    type: "Deposit",
    amount: 500.0,
    balanceAfter: 700.75,
  },
  // Additional mock entries if needed
];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching transaction data
    setTransactions(mockTransactions);
  }, []);

  return (
    <div className="h-[79.91vh] flex items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Page Header */}
        <h1 className="bg-navy text-white w-full p-2 mb-2 uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl">
          Transaction History
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          "Here are your transactions, in clear action!"
        </h2>

        {/* Scrollable Transaction Table */}
        <div className="max-h-72 overflow-y-auto border">
          <table className="w-full table-auto text-left mb-6 px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
            <thead>
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
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                      {transaction.type}
                    </td>
                    <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                      {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-navy-blue text-base lg:text-lg sm:text-xs md:text-md">
                      {transaction.balanceAfter.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-sm text-gray-600"
                  >
                    No transactions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
