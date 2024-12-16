import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Stations = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const GOMAPS_API_KEY = "AlzaSytXtChtz8euiDoT5-OGlwYF4a6KSvGylxd"; // Replace with your GoMaps API key

  // Fetch user's live location
  const handleFetchLiveLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  // Convert Address to Coordinates (Geocoding)
  const handleSearchLocation = async () => {
    setError("");
    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${GOMAPS_API_KEY}`
      );
      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry.location;
        setLocation({ lat, lng });
        setAddress(result.formatted_address);
      } else {
        setError("No results found for the entered location.");
      }
    } catch (error) {
      setError("Failed to search location. Please try again later.");
    }
  };

  // Fetch Nearest Stations Using Coordinates
  const fetchNearestStations = async (lat, lng) => {
    setError("");
    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?keyword=ev+charging+station&location=${lat},${lng}&radius=5000&key=${GOMAPS_API_KEY}`
      );
      setStations(response.data.results);
    } catch (error) {
      setError("Failed to fetch nearby stations. Please try again later.");
    }
  };

  // Handle "Find Nearest Stations" Button
  const handleFetchStations = async () => {
    if (!location.lat || !location.lng) {
      setError("Please provide a valid location first.");
      return;
    }
    await fetchNearestStations(location.lat, location.lng);
  };

  // Navigate to Booking Page
  const handleBooking = (station) => {
    navigate("/booking", { state: { station } });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Find EV Charging Stations</h1>

      {/* Fetch Live Location Button */}
      <button
        onClick={handleFetchLiveLocation}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Use My Live Location
      </button>

      {/* Search Bar for Manual Location Entry */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "calc(100% - 120px)",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearchLocation}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search Location
        </button>
      </div>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* Display Address */}
      {address && (
        <div style={{ marginTop: "10px" }}>
          <h3>Address/Location:</h3>
          <p>{address}</p>
        </div>
      )}

      {/* Fetch Stations Button */}
      <button
        onClick={handleFetchStations}
        style={{
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Fetch Nearby Stations
      </button>

      {/* Display Nearest Stations */}
      {stations.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Nearest EV Charging Stations:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {stations.map((station, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <strong style={{ fontSize: "18px" }}>{station.name}</strong>
                <p>{station.vicinity}</p>
                {/* Book Slot Button */}
                <button
                  onClick={() => handleBooking(station)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Book Slot
                </button>
                {/* Navigate Button */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${station.geometry.location.lat},${station.geometry.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#008CBA",
                    color: "white",
                    textDecoration: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Navigate
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stations;
