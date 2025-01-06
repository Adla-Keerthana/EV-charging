// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stations from "./pages/Stations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/booking";
import Confirmation from "./pages/confirmation";
import UserBookings from "./pages/ProfilePage";
import StripeElement from "./pages/Stripe";

function App() {
  return (
    <Routes>
      <Route path="/payment" element={<StripeElement />} />

    <Route path="/" element={<Home />} /> Home route
      <Route path="/stations" element={<Stations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/profile" element={<UserBookings />} />
    </Routes>
  );
}

export default App;
