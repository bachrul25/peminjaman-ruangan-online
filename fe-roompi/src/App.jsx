import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RoomsPage from './pages/RoomsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import BookingSuccess from './pages/BookingSuccess';
import RoomDetail from './pages/DetailRoom';




function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/detail-room/:id_ruangan" element={<RoomDetail />} />
        <Route path="/booking-success/:id" element={<BookingSuccess/>}/>
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  )
}

export default App
