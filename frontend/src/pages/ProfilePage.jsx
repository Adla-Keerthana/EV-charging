import React, { useEffect, useState } from "react";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        console.log("userId", userId);

        // Make GET request with user_id as URL parameter
        const response = await fetch(
          `http://localhost:8000/api/bookings?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        // Handle non-200 response
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse response as JSON
        const data = await response.json();
        setBookings(data.bookings || []); // Assuming the API returns bookings as an array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.");
        setLoading(false);
      }
    };

    // Fetch bookings only if userId is available
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 font-semibold">No bookings found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {booking.full_name}
            </h2>
            {/* <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Station ID:</span>{" "}
              {booking.station_id}
            </p> */}
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Time Slot:</span>{" "}
              {booking.time_slot}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Email:</span> {booking.email}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Vehicle Number:</span>{" "}
              {booking.vehicle_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
