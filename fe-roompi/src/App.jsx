import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
