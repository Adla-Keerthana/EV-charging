import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  // Handle form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState(""); // New state for Vehicle Number
  const [userId, setUserId] = useState(1); // Assuming user ID is 1 for now, adjust accordingly
  const [isBooking, setIsBooking] = useState(false); // To handle booking status

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked Submit");

    // Ensure station is available and extract the station ID

    // Construct the booking data
    const bookingData = {
      station_id: "station.place_id", // User ID for the logged-in user
      time_slot: `${bookingDate} ${bookingTime}`, // Combine date and time
      full_name: fullName,
      user_id: localStorage.getItem("user_id"),
      email: email,
      vehicle_number: vehicleNumber,
    };

    try {
      setIsBooking(true); // Disable form during booking process
      console.log("Booking data", bookingData); // Check booking data in console

      // Send POST request to the backend for booking using fetch
      let response = await fetch("http://localhost:8000/bookings/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(bookingData),
      });
      let res = await response.json();
      console.log(res);
    } catch (error) {
      console.error("Error booking the slot:", error);
      // alert("Error booking the slot. Please try again.");
    } finally {
      setIsBooking(false); // Enable form again after completion
    }
  };

  return (
    <div className="booking-container max-w-4xl mx-auto mt-10 p-8 bg-opacity-50 bg-gray-800 shadow-lg rounded-xl">
      <h1 className="text-4xl font-semibold text-center text-white-600">
        Booking
      </h1>
      <p className="mt-4 text-center text-gray-300">
        You are booking a slot at{" "}
        {/* <strong className="text-green-500">
          {station ? station.name : "No station selected"}
        </strong> */}
      </p>

      {/* Booking Form */}
      <div className="mt-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white bg-opacity-80 p-6 rounded-lg shadow-md"
        >
          {/* Form fields remain the same */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Vehicle Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your vehicle number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Booking Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Booking Time
            </label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
