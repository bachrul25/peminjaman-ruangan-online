import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile/profile';
import RoomsPage from './pages/RoomsPage';
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DetailRoom from './pages/DetailRoom';
import History from './pages/History/history';



function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/detail-room" element={<DetailRoom/>} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  )
}

export default App
