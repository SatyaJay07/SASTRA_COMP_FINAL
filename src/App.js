// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/login';
import Analytics from './pages/analytics'; // Import the Analytics component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/analytics" element={<Analytics />} /> {/* Add a route for Analytics */}
      </Routes>
    </Router>
  );
};

export default App;
