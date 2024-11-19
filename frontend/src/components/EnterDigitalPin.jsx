import React, { useState } from "react";

const EnterDigitalPin = ({ onSubmit, onClose }) => {
  const [pin, setPin] = useState("");
  const handleSubmit = () => {
    onSubmit(pin);
    setPin("");
  };

  return (
    <div className="fixed inset-0 flex items-center text-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        <h2 className="text-lg font-bold mb-4">Enter Digital Pin</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter your pin"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-navy text-white w-full p-2 rounded text-sm sm:text-base"
        >
          Submit
        </button>
        <button onClick={onClose} className="mt-2 text-red-500 w-full">
          Return to all services
        </button>
      </div>
    </div>
  );
};

export default EnterDigitalPin;
