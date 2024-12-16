import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  return (
    <div className="confirmation-container max-w-3xl mx-auto mt-10 p-8 bg-opacity-50 bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-green-500">Booking Confirmed!</h2>
      <p className="mt-4 text-center text-gray-300">Thank you for your booking. Details:</p>
      <ul className="mt-4 space-y-2 text-center text-white">
        <li><strong>Name:</strong> {bookingDetails?.userName}</li>
        <li><strong>Station:</strong> {bookingDetails?.stationName}</li>
        <li><strong>Booking Time:</strong> {bookingDetails?.timeSlot}</li>
      </ul>
    </div>
  );
};

export default Confirmation;
