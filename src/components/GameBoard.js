import React, { useState, useEffect } from "react";
import "./GameBoard.css";

const BOARD_SIZE = 20;

const SnakeGame = () => {
  // Initial position of the snake
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Initial snake position
  const [fruit, setFruit] = useState({ x: 5, y: 5 }); // Initial fruit position
  const [direction, setDirection] = useState("ArrowRight"); // Initial direction
  const [nextDirection, setNextDirection] = useState("ArrowRight"); // Buffer direction
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [score, setScore] = useState(0); // Score

  // Function to handle movement logic
  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newHead = { ...prevSnake[0] }; // Copy the current head of the snake

      // Move the snake's head in the current direction
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

      // Wall collision detection
      if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Self-collision detection
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      // Create the new snake array with the new head
      const newSnake = [newHead, ...prevSnake];

      // Check for fruit collision
      if (newHead.x === fruit.x && newHead.y === fruit.y) {
        setFruit({
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        });
        setScore((prevScore) => prevScore + 1); // Increase score
      } else {
        // Remove the last segment (tail) if no fruit is eaten
        newSnake.pop();
      }

      return newSnake;
    });

    // Update the direction from nextDirection
    setDirection(nextDirection);
  };

  // Listen for keyboard input
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

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  // Update the snake's position every 200ms
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [direction, nextDirection, gameOver]);

  if (gameOver) {
    return (
      <div className="game-container" style={{ backgroundColor: "#f0f8ff", padding: "10px", borderRadius: "10px" }}>
        <h1 style={{ color: "#e74c3c", textAlign: "center" }}>Game Over</h1>
        <p style={{ textAlign: "center", color: "#2c3e50" }}>Final Score: {score}</p>
        <button
          onClick={() => {
            setSnake([{ x: 10, y: 10 }]); // Reset snake position
            setFruit({ x: 5, y: 5 }); // Reset fruit position
            setDirection("ArrowRight"); // Reset direction
            setNextDirection("ArrowRight"); // Reset buffer direction
            setGameOver(false); // Reset game over state
            setScore(0); // Reset score
          }}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="game-container" style={{ backgroundColor: "#f0f8ff", padding: "10px", borderRadius: "10px" }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>Snake Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 25px)`,
          gridGap: "2px",
          margin: "20px auto",
          backgroundColor: "#ecf0f1",
          border: "2px solid #2c3e50",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFruit = fruit.x === x && fruit.y === y;
          return (
            <div
              key={index}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: isSnake ? "#27ae60" : isFruit ? "#e74c3c" : "#bdc3c7",
                border: "1px solid #ecf0f1",
                borderRadius: isFruit ? "50%" : "5px",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SnakeGame;
