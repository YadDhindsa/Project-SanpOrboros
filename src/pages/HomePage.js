// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game'); // Redirects to the GamePage
  };

  const handleInstructions = () => {
    navigate('/instructions'); // Redirects to the InstructionsPage
  };

  return (
    <div className="home-page">
      <h1>Welcome to Snake Game</h1>
      <button onClick={handleStartGame} className="start-game-button">
        Start Game
      </button>
      <button onClick={handleInstructions} className="instructions-button">
        Instructions
      </button>
    </div>
  );
};

export default HomePage;
