import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile/profile';
import Room from './pages/Room/Room';
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DetailRoom from './pages/DetailRoom/DetailRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/detail-room" element={<DetailRoom/>} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        

      </Routes>
    </Router>
  )
}

export default App
