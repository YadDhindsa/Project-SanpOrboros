import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const gridSize = 20;
  const initialSnake = [{ x: 10, y: 10 }];
  const initialFruit = [{ x: 15, y: 15 }];

  const [snake, setSnake] = useState(initialSnake);
  const [fruits, setFruits] = useState(initialFruit);
  const [direction, setDirection] = useState('ArrowRight');
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'ArrowRight':
        head.x += 1;
        break;
      case 'ArrowLeft':
        head.x -= 1;
        break;
      case 'ArrowUp':
        head.y -= 1;
        break;
      case 'ArrowDown':
        head.y += 1;
        break;
      default:
        break;
    }

    // Check for collisions
    if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (fruits.some(fruit => fruit.x === head.x && fruit.y === head.y)) {
      setFruits([{ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) }]);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const startGame = () => {
    setSnake(initialSnake);
    setFruits(initialFruit);
    setGameOver(false);
    setDirection('ArrowRight');
  };

  useEffect(() => {
    const handleKeyDown = (event) => setDirection(event.key);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  return (
    <GameContext.Provider value={{ gridSize, snake, fruits, startGame, gameOver }}>
      {children}
    </GameContext.Provider>
  );
};
