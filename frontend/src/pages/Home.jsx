// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">EV Charging Finder</h1>
                <div className="text-lg">
                    <Link to="/" className="text-white px-6">Home</Link>
                    <Link to="/stations" className="text-white px-6">Stations</Link>
                    <Link to="/login" className="text-white px-6">Login</Link>
                    <Link to="/signup" className="text-white px-6">Sign Up</Link>
                    <Link to="/booking" className="text-white px-6">Bookings</Link>
                    <Link to="/payment" className="text-white px-6">Payment</Link>
                </div>
            </div>
        </nav>
    );
};

const Home = () => {
    return (
        <>
            <Navbar /> {/* Keep Navbar as is */}
            <div className="flex items-center justify-between min-h-screen bg-gray-100 px-8">
                {/* Left Content: Information */}
                <div className="max-w-lg">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to EV Charging Station Finder</h1>
                    <p className="mt-6 text-lg text-gray-700">
                        Our platform is dedicated to making your electric vehicle charging experience seamless and efficient. Explore features like locating charging stations, booking slots, and managing your trips effortlessly.
                    </p>
                    <p className="mt-4 text-lg text-gray-700">
                        Why choose us?
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 text-lg">
                        <li>Real-time station availability for accurate planning</li>
                        <li>Easy-to-use booking and payment options</li>
                        <li>Customized routes to save time and energy</li>
                        <li>24/7 support for any assistance</li>
                        <li>Eco-friendly journey tracking and analytics</li>
                    </ul>
                    <p className="mt-6 text-lg text-gray-700">
                        Join us in revolutionizing the EV charging experience and contribute to a sustainable future. Discover how our platform can make your EV journey smarter and more reliable.
                    </p>
                </div>

                 {/* Right Content: Background Image */}
                 <div className="w-1/2">
                    <img 
                        src="https://static1.squarespace.com/static/5f3b08d4515c242514c95656/t/645929777e341a681183c760/1683564919506/commercial-ev-charging-station.jpg?format=1500w" 
                        alt="EV Charging Station" 
                        className="rounded-lg shadow-lg w-full h-auto"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
