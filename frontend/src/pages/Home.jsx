import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token"); // Check if token exists in localStorage

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    window.location.reload(); // Reload the page after logout to update the Navbar
  };

  return (
    <>
      <div className="flex items-center justify-between min-h-screen bg-gray-100 px-8 py-16 animate-fadeIn">
        {/* Left Content: Information */}
        <div className="max-w-2xl space-y-6 p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight transform transition-all duration-300 hover:text-blue-600">
            Welcome to the EV Charging Station Finder
          </h1>
          <p className="text-xl text-gray-700 mt-4 animate-fadeInLeft">
            Our platform is dedicated to making your electric vehicle charging
            experience seamless and efficient. Explore features like locating
            charging stations, booking slots, and managing your trips
            effortlessly.
          </p>
          <p className="text-lg text-gray-700 mt-4 font-semibold">
            Why choose us?
          </p>
          <ul className="list-disc ml-6 text-lg text-gray-700 space-y-2 animate-fadeInRight">
            <li>Real-time station availability for accurate planning</li>
            <li>Easy-to-use booking and payment options</li>
            <li>Customized routes to save time and energy</li>
            <li>24/7 support for any assistance</li>
            <li>Eco-friendly journey tracking and analytics</li>
          </ul>
          <p className="text-lg text-gray-700 mt-6">
            Join us in revolutionizing the EV charging experience and contribute
            to a sustainable future. Discover how our platform can make your EV
            journey smarter and more reliable.
          </p>
          <div className="mt-8">
            <Link to="/stations">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
                Find Charging Stations
              </button>
            </Link>
          </div>
          {/* If logged in, show the logout button */}
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          )}
        </div>

        {/* Right Content: Background Image */}
        <div className="w-1/2 hidden md:block transform transition-all duration-500 hover:scale-105">
          <img
            src="https://static1.squarespace.com/static/5f3b08d4515c242514c95656/t/645929777e341a681183c760/1683564919506/commercial-ev-charging-station.jpg?format=1500w"
            alt="EV Charging Station"
            className="rounded-lg shadow-xl w-full h-auto object-cover animate-fadeInUp"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
