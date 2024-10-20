import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Appointments from './Appointments';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/appointments" element={<Appointments />} /> {/* Appointments page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
      </Routes>
    </Router>
  );
}

export default App;
