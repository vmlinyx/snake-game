/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";

import Snake from "./Snake";
import Food from "./Food";

function App() {
  const initSnake = [
    [0, 0],
    [2, 0],
    [4, 0],
    [6, 0],
  ];
  const initSpeed = 200;
  const initDirection = "RIGHT";
  const getRandomCoordinates = function () {
    const MIN = 1;
    const MAX = 98;
    let x = parseInt((Math.random() * (MAX - MIN + 1) + MIN) / 2) * 2;
    let y = parseInt((Math.random() * (MAX - MIN + 1) + MIN) / 2) * 2;
    return [x, y];
  };
  const [snakeDots, setSnakeDots] = useState(initSnake);
  const [foodDot, setFoodDot] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState(initDirection);
  const [speed, setSpeed] = useState(initSpeed);
  const directions = {
    UP: { tag: "UP", keyCode: 38, action: (a) => [a[0], a[1] - 2] },
    DOWN: { tag: "DOWN", keyCode: 40, action: (a) => [a[0], a[1] + 2] },
    LEFT: { tag: "LEFT", keyCode: 37, action: (a) => [a[0] - 2, a[1]] },
    RIGHT: { tag: "RIGHT", keyCode: 39, action: (a) => [a[0] + 2, a[1]] },
  };

  const moveSnake = function () {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];
    let newHead = directions[direction].action(head);
    dots.push(newHead);
    dots.shift();
    setSnakeDots(dots);
  };

  const checkIfEat = function () {
    let head = snakeDots[snakeDots.length - 1];
    let food = foodDot;
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoodDot(getRandomCoordinates());
      enlargeSnake();
      increaseSpeed();
    }
  };
  const enlargeSnake = function () {
    const dots = [...snakeDots];
    dots.unshift([]);
    setSnakeDots(dots);
  };
  const increaseSpeed = function () {
    if (speed > 10) {
      setSpeed(speed - 10);
    } else {
      onGameOver();
    }
  };

  const keyDown = function (e) {
    e = e || window.event;
    const newDirection = Object.values(directions).find(
      (d) => d.keyCode === e.keyCode
    );
    setDirection(newDirection.tag);
  };
  const checkIfOutOfBorder = function () {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };
  const onGameOver = function () {
    alert(`Game Over. Snake length is ${snakeDots.length}`);
    setSnakeDots(initSnake);
    setSpeed(initSpeed);
    setDirection(initDirection);
  };
  const checkIfCollapsed = function () {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  useEffect(() => {
    document.onkeydown = keyDown;
    const interval = setInterval(moveSnake, 50);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    checkIfEat();
    checkIfOutOfBorder();
    checkIfCollapsed();
  }, [snakeDots]);

  return (
    <div className="App">
      <div className="game-area">
        <Snake snakeDots={snakeDots} />
        <Food foodDot={foodDot} />
      </div>
    </div>
  );
}
export default App;
