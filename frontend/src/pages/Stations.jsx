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
    console.log("station", station.place_id);
    navigate("/bookings", { state: { station } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Find EV Charging Stations</h1>

      {/* Fetch Live Location Button */}
      <button
        onClick={handleFetchLiveLocation}
        style={styles.liveLocationButton}
      >
        Use My Live Location
      </button>

      {/* Search Bar for Manual Location Entry */}
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Enter a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearchLocation} style={styles.searchButton}>
          Search Location
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Display Address */}
      {address && (
        <div style={styles.addressContainer}>
          <h3>Address/Location:</h3>
          <p>{address}</p>
        </div>
      )}

      {/* Fetch Stations Button */}
      <button onClick={handleFetchStations} style={styles.fetchStationsButton}>
        Fetch Nearby Stations
      </button>

      {/* Display Nearest Stations */}
      {stations.length > 0 && (
        <div style={styles.stationsListContainer}>
          <h3>Nearest EV Charging Stations:</h3>
          <ul style={styles.stationsList}>
            {stations.map((station, index) => (
              <li key={index} style={styles.stationItem}>
                <strong style={styles.stationName}>{station.name}</strong>
                <p>{station.vicinity}</p>
                {/* Book Slot Button */}
                <button
                  onClick={() => handleBooking(station)}
                  style={styles.bookSlotButton}
                >
                  Book Slot
                </button>
                {/* Navigate Button */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${station.geometry.location.lat},${station.geometry.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.navigateButton}
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

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    color: "#4CAF50",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  liveLocationButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    width: "100%",
    fontSize: "1rem",
  },
  searchBarContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "calc(100% - 120px)",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  addressContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  fetchStationsButton: {
    backgroundColor: "#008CBA",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    fontSize: "1rem",
  },
  stationsListContainer: {
    marginTop: "30px",
  },
  stationsList: {
    listStyleType: "none",
    padding: 0,
  },
  stationItem: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  stationName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  bookSlotButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "15px",
  },
  navigateButton: {
    backgroundColor: "#008CBA",
    color: "white",
    textDecoration: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Stations;
