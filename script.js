"use strict";
const canvas = document.querySelector("#board");
const c = canvas.getContext("2d");
const block = 25;
const row = 20;
const column = 20;

canvas.height = row * block;
canvas.width = column * block;

// const snakeArr = [[snakeX, snakeY]];
// console.log(snakeArr);
let snakeX;
let snakeY;
let snakeArr;
let foodX;
let foodY;
let score;
let velocityX;
let velocityY;
function init() {
  snakeX = 9;
  snakeY = 9;
  foodX = Math.trunc(Math.random() * 20);
  foodY = Math.trunc(Math.random() * 20);
  score = 0;
  document.querySelector("h3").textContent = `score: ${score}`;
  snakeArr = [];
  velocityX = 0;
  velocityY = 0;
}
init();
update();

document.addEventListener("keydown", function checkDirection(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }

      break;
    case "ArrowRight":
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }

      break;
    case "ArrowDown":
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }

      break;
    case "ArrowUp":
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
  }
});

function update() {
  c.fillStyle = "black";
  c.fillRect(0, 0, row * block, column * block);
  food();

  //   snakeArr.push(snakeX, snakeY);
  //   console.log(snakeArr);
  if (snakeX === foodX && snakeY === foodY) {
    snakeArr.push([foodX, foodY]);
    // console.log(snakeArr);
    changeFood();
    food();
    score++;
    document.querySelector("h3").textContent = `score: ${score}`;
  }

  snake((snakeX += velocityX), (snakeY += velocityY));
  if (snakeArr.includes(snakeX, snakeY)) console.log("heloworld");
  snakeArr[0] = [snakeX, snakeY];

  for (let i = snakeArr.length - 1; i > 0; i--) {
    snake(snakeArr[i][0], snakeArr[i][1]);
    snakeArr[i] = snakeArr[i - 1];
  }
  for (let i = 2; i < snakeArr.length; i++) {
    if (snakeArr[i][0] === snakeX && snakeArr[i][1] === snakeY) {
      gameOver();
    }
  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 20 || snakeY >= 20) gameOver();
}

function changeFood() {
  foodX = Math.trunc(Math.random() * 20);
  foodY = Math.trunc(Math.random() * 20);
}

function food() {
  c.fillStyle = "red";
  c.fillRect(foodX * block, foodY * block, block, block);
}

function snake(x, y) {
  c.fillStyle = "lime";
  c.fillRect(x * block, y * block, block, block);
}
function gameOver() {
  clearInterval(interval);
  document.querySelector(
    "h3"
  ).textContent = `You lost. Your score was ${score}`;
}

let interval = setInterval(() => {
  update();
}, 150);
document.querySelector("button").addEventListener("click", () => {
  clearInterval(interval);
  init();
  update();
  interval = setInterval(() => {
    update();
  }, 150);
});

// let;
