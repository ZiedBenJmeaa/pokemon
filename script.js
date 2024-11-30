const GRASS_CLASS = "grass",
  GRASS_COUNT = 50;
const BALL_CLASS = "ball",
  BALL_COUNT = 5;
const PLAYER = document.querySelector(".player");

let playerPos = {
  x: 0,
  y: 0,
};
let playerVel = {
  x: 0,
  y: 0,
};
const PLAYER_SPEED = 1.8;
const START_PLAYER_POS = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
const SOUND = new Audio("assets/coin.mp3");

let score = 0;
let timer = 0;
let timerInterval;

// Update score display
const scoreDisplay = document.createElement("div");
scoreDisplay.className = "score";
scoreDisplay.style.position = "fixed";
scoreDisplay.style.top = "10px";
scoreDisplay.style.left = "10px";
scoreDisplay.style.color = "white";
scoreDisplay.style.fontSize = "24px";
scoreDisplay.textContent = `Score: ${score}`;
document.body.appendChild(scoreDisplay);

// Update timer display
const timerDisplay = document.createElement("div");
timerDisplay.className = "timer";
timerDisplay.style.position = "fixed";
timerDisplay.style.top = "10px";
timerDisplay.style.right = "10px";
timerDisplay.style.color = "white";
timerDisplay.style.fontSize = "24px";
timerDisplay.textContent = `Time: ${timer}`;
document.body.appendChild(timerDisplay);

function start() {
  generateElement(GRASS_CLASS, GRASS_COUNT);
  generateElement(BALL_CLASS, BALL_COUNT);
  playerPos = START_PLAYER_POS;

  // Start the timer
  startTimer();
}

function update() {
  playerPos.x += playerVel.x;
  playerPos.y += playerVel.y;
  PLAYER.style.left = playerPos.x + "px";
  PLAYER.style.top = playerPos.y + "px";
  checkCollision();

  requestAnimationFrame(update);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}`;
  }, 1000);
}

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVel.y = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_front.png')";
  }
  if (e.key == "ArrowDown") {
    playerVel.y = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_back.png')";
  }
  if (e.key == "ArrowLeft") {
    playerVel.x = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_left.png')";
  }
  if (e.key == "ArrowRight") {
    playerVel.x = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_right.png')";
  }
  PLAYER.classList.add("walk");
});
window.addEventListener("keyup", (e) => {
  playerVel.x = 0;
  playerVel.y = 0;
  PLAYER.classList.remove("walk");
});

function generateElement(className, elemntCount) {
  for (let count = 0; count < elemntCount; count++) {
    const newElement = document.createElement("div");
    newElement.classList.add(className);
    newElement.style.left = Math.random() * 100 + "%";
    newElement.style.top = Math.random() * 100 + "%";
    document.body.appendChild(newElement);
  }
}

function checkCollision() {
  const balls = document.querySelectorAll(".ball");
  balls.forEach((ball) => {
    if (collision(ball, PLAYER)) {
      ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      SOUND.play();
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  });
}

function collision(obj1, obj2) {
  const rect1 = obj1.getBoundingClientRect();
  const rect2 = obj2.getBoundingClientRect();
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

start();
update();