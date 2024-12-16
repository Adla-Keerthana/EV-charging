// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Stations from './pages/Stations'; 
import Login from './pages/Login'; 
import SignUp from './pages/Signup'; 
import Booking from './pages/booking';



function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> {/* Home route */}
            <Route path="/stations" element={<Stations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/bookings" element={<Booking />} />        
        </Routes>
    );
}

export default App;
