// src/pages/GamePage.js
import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';

const GamePage = () => {
  const [gridSize] = useState(20);
  const [snakeCells] = useState(new Set(['10-10', '10-11']));
  const [fruitCell] = useState('5-5');

  return <GameBoard gridSize={gridSize} snakeCells={snakeCells} fruitCell={fruitCell} />;
};

export default GamePage;
