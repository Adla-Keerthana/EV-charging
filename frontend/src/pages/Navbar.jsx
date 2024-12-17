import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if the token exists in localStorage (or sessionStorage)
  const token = localStorage.getItem("access_token"); // You can replace this with sessionStorage if you prefer

  return (
    <nav className="bg-blue-600 p-6 shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-extrabold tracking-wider">
          EV Charging Finder
        </h1>
        <div className="text-lg">
          <Link
            to="/"
            className="text-white px-6 hover:text-yellow-400 transition"
          >
            Home
          </Link>
          <Link
            to="/stations"
            className="text-white px-6 hover:text-yellow-400 transition"
          >
            Stations
          </Link>
          {/* Conditionally render Login and Signup based on the presence of the token */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-white px-6 hover:text-yellow-400 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white px-6 hover:text-yellow-400 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-white px-6 hover:text-yellow-400 transition"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="text-white px-6 hover:text-yellow-400 transition"
              >
                Logout
              </Link>
            </>
          )}
          <Link
            to="/bookings"
            className="text-white px-6 hover:text-yellow-400 transition"
          >
            Bookings
          </Link>
          <Link
            to="/payment"
            className="text-white px-6 hover:text-yellow-400 transition"
          >
            Payment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
