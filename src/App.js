// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import InstructionsPage from './pages/InstructionsPage'; // Import here

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
