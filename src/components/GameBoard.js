import React, { useState, useEffect } from "react";
import "./GameBoard.css";

const BOARD_SIZE = 20;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Initial snake position
  const [fruit, setFruit] = useState({ x: 5, y: 5 }); // Initial fruit position
  const [direction, setDirection] = useState("ArrowRight"); // Initial direction
  const [nextDirection, setNextDirection] = useState("ArrowRight"); // Buffer direction
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [score, setScore] = useState(0); // Score
  const [playerName, setPlayerName] = useState(""); // Player's name
  const [isNameSet, setIsNameSet] = useState(false); // Name input state

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newHead = { ...prevSnake[0] };

      switch (direction) {
        case "ArrowUp":
          newHead.y -= 1;
          break;
        case "ArrowDown":
          newHead.y += 1;
          break;
        case "ArrowLeft":
          newHead.x -= 1;
          break;
        case "ArrowRight":
          newHead.x += 1;
          break;
        default:
          break;
      }

      if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === fruit.x && newHead.y === fruit.y) {
        setFruit({
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });

    setDirection(nextDirection);
  };

  const handleKeyPress = (e) => {
    const validDirections = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const oppositeDirections = {
      ArrowUp: "ArrowDown",
      ArrowDown: "ArrowUp",
      ArrowLeft: "ArrowRight",
      ArrowRight: "ArrowLeft",
    };

    if (validDirections.includes(e.key) && direction !== oppositeDirections[e.key]) {
      setNextDirection(e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [direction, nextDirection, gameOver]);

  if (!isNameSet) {
    return (
      <div className="game-container">
        <h1>Welcome to SanpOrboros</h1>
        <label>
          Enter your name:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="name-input"
          />
        </label>
        <button
          onClick={() => playerName.trim() && setIsNameSet(true)}
          className="start-button"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-container">
        <h1>Game Over</h1>
        <p>{playerName}, your final score is: {score}</p>
        <button
          onClick={() => {
            setSnake([{ x: 10, y: 10 }]);
            setFruit({ x: 5, y: 5 });
            setDirection("ArrowRight");
            setNextDirection("ArrowRight");
            setGameOver(false);
            setScore(0);
          }}
          className="restart-button"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>SanpOrboros</h1>
      <p>Welcome, {playerName}! Your current score is: {score}</p>
      <div className="game-board">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFruit = fruit.x === x && fruit.y === y;
          return (
            <div
              key={index}
              className={`cell ${isSnake ? "snake" : isFruit ? "fruit" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SnakeGame;
