const container = document.querySelector('.container');
const snake = document.querySelector('.snake');
const food = document.querySelector('.food');
const score = document.querySelector('.score span');
const speed = document.querySelector('.speed span');
const gameOver = document.querySelector('.game-over');
const gameOverMessage = document.querySelector('.game-over .message');
const playAgainButton = document.querySelector('.play-again');
const pause = document.querySelector('.pause');
const pauseMessage = document.querySelector('.pause .message');
const resumeButton = document.querySelector('.resume');
const eatSound = document.querySelector('#eat-sound');
const gameOverSound = document.querySelector('#game-over-sound');

let snakeX = 150;
let snakeY = 150;
let foodX = getRandomX();
let foodY = getRandomY();
let dx = 10;
let dy = 0;
let snakeLength = 1;
let scoreValue = 0;
let speedValue = 1;
let gamePaused = false;

score.textContent = scoreValue;
speed.textContent = speedValue;

document.addEventListener('keydown', changeDirection);
playAgainButton.addEventListener('click', playAgain);
resumeButton.addEventListener('click', resumeGame);

function changeDirection(event) {
    if (event.keyCode == 37 && dx == 0) {
        dx = -10;
        dy = 0;
    } else if (event.keyCode == 38 && dy == 0) {
        dx = 0;
        dy = -10;
    } else if (event.keyCode == 39 && dx == 0) {
        dx = 10;
        dy = 0;
    } else if (event.keyCode == 40 && dy == 0) {
        dx = 0;
        dy = 10;
    } else if (event.keyCode == 32) {
        togglePause();
    }
}

function getRandomX() {
    let randomX = Math.floor(Math.random() * 29) * 10;
    return randomX;
}

function getRandomY() {
    let randomY = Math.floor(Math.random() * 29) * 10;
    return randomY;
}

function moveSnake() {
    snakeX += dx;
    snakeY += dy;

    if (snakeX < 0) {
        snakeX = 290;
    } else if (snakeX > 290) {
        snakeX = 0;
    } else if (snakeY < 0) {
        snakeY = 290;
    } else if (snakeY > 290) {
        snakeY = 0;
    }

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';
}

function eatFood() {
    if (snakeX == foodX && snakeY == foodY) {
        eatSound.play();

        snakeLength++;
        scoreValue++;
        speedValue = Math.floor(scoreValue / 5) + 1;

        score.textContent = scoreValue;
        speed.textContent = speedValue;

        foodX = getRandomX();
        foodY = getRandomY();
        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }
}

function updateSnakeLength() {
    if (snakeLength > 1) {
        let currentX = snakeX;
        let currentY = snakeY;

        for (let i = 0; i < snakeLength - 1; i++) {
            let previousX = parseInt(snake.previousElementSibling.style.left);
            let previousY = parseInt(snake.previousElementSibling.style.top);
            snake.previousElementSibling.style.left = currentX + 'px';
            snake.previousElementSibling.style.top = currentY + 'px';
            currentX = previousX;
            currentY = previousY;
            snake = snake.previousElementSibling;
        }
    }
}

function checkGameOver() {
    let elements = document.elementsFromPoint(snakeX, snakeY);
    if (!elements.includes(snake) || elements.length > 2) {
        gameOver();
    }
}

function gameOver() {
    gamePaused = true;
    gameOverSound.play();
    pause.style.display = 'none';
    resumeButton.style.display = 'none';
    overMessage.textContent = `Game Over! Your score is ${scoreValue}.`;
    over.style.display = 'block';
}

function playAgain() {
    snakeX = 150;
    snakeY = 150;
    foodX = getRandomX();
    foodY = getRandomY();
    dx = 10;
    dy = 0;
    snakeLength = 1;
    scoreValue = 0;
    speedValue = 1;

    score.textContent = scoreValue;
    speed.textContent = speedValue;
    over.style.display = 'none';

    while (snake.nextElementSibling) {
        snake.nextElementSibling.remove();
    }

    pause.style.display = 'block';
    gamePaused = false;
}

function togglePause() {
    if (!gamePaused) {
        gamePaused = true;
        pauseMessage.textContent = 'Paused';
        pause.style.display = 'none';
        resumeButton.style.display = 'block';
    } else {
        gamePaused = false;
        pause.style.display = 'block';
        resumeButton.style.display = 'none';
    }
}

function resumeGame() {
    gamePaused = false;
    pause.style.display = 'block';
    resumeButton.style.display = 'none';
}

function gameLoop() {
    if (!gamePaused) {
        updateSnakeLength();
        moveSnake();
        eatFood();
        checkGameOver();
    }
    setTimeout(gameLoop, 1000 / speedValue);
}

gameLoop();


