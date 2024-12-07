// src/pages/InstructionsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructionsPage.css';

const InstructionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="instructions-page">
      <h1>How to Play</h1>
      <ol>
        <li>Use the arrow keys to move the snake.</li>
        <li>Eat the fruits to score points.</li>
        <li>Avoid colliding with the walls or the snake's own body.</li>
        <li>Keep playing to achieve the highest score!</li>
      </ol>
      <button onClick={() => navigate('/')} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default InstructionsPage;
