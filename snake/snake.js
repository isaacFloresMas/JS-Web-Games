const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasH = canvas.height;
const canvasW = canvas.width;
const snakeH = snakeW = 20;

let dx, dy, rightPressed, leftPressed, upPressed, downPressed, snakes, score, interval, foodX, foodY, foods;
let rounds = [];

setInitialVariables();
randomFood();
drawSnake();
drawFood();
moveSnake();
drawScore();
snakeNavigation();
showScore();

function moveSnake() {
    if (!interval) {
        interval = setInterval(() => {
            handleDirection();
            collisionDetection();
            growSnake();
            const head = {x: snakes[0].x + dx, y: snakes[0].y + dy, c: snakes[0].c};
            snakes.unshift(head);
            shiftColor();
            snakes.pop();
            ctx.clearRect(0,0,canvasH,canvasW);
            drawSnake();
            drawFood();
            drawScore();
        },  50);
    }
}

function collisionDetection() {
    const leftCollision = snakes[0].x < 0;
    const rightCollision = snakes[0].x > canvasW-5;
    const bottomCollision = snakes[0].y > canvasH-5;
    const topCollision = snakes[0].y < 0;

    if (leftCollision || rightCollision || bottomCollision || topCollision) {
        alert('Game Over!');
        reset();
    }
    for (let i = 1; i < snakes.length; i++) {
        if (snakes[0].x == snakes[i].x &&
        snakes[0].y == snakes[i].y) {
            alert('Game Over!');
            reset();
        }
    }
}

function reset() {
    clearInterval(interval);
    rounds.push({score:score});
    showScore();
    setInitialVariables();
    randomFood();
    moveSnake();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.font = '15px serif';
    ctx.fillText("Score: " + score, canvasW-60, 20, 80);
    ctx.closePath();
}

function setInitialVariables() {
    interval = null;
    snakes = [{x:snakeW, y:snakeH, c: getRandColor()}];
    rightPressed = leftPressed = upPressed = downPressed = false;  
    dx = dy = 0;
    score = 0;
    foods = [];
}

function drawSnake() {
    snakes.forEach(snake => {
        ctx.beginPath();
        ctx.rect(snake.x,snake.y,snakeW,snakeH);
        ctx.fillStyle = snake.c;
        ctx.fill();
        ctx.closePath();
    })
}

function growSnake() {
    for (let i = 0; i < foods.length; i++) {
        if (snakes[0].x == foods[i].x && snakes[0].y == foods[i].y) {
            snakes.push({x: foodX, y: foodY, c: getRandColor()});
            foods.splice(i, 1);
            randFoodPosition();
            foods.push({x: foodX, y: foodY});
            score += 1;
              
        }
    }
}

function drawFood() {
    for (let i = 0; i < foods.length; i++) {
        ctx.beginPath();
        ctx.rect(foods[i].x,foods[i].y,snakeW,snakeH);
        ctx.fillStyle = '#34a322';
        ctx.fill();
        ctx.closePath();
    }
}

function showScore() {
    const scoreol = document.getElementById('scoreOl');
    scoreol.innerHTML = rounds.map(round => `<li>Score: ${round.score}</li>`).join(" ");
}

function randomFood() {
    for (let i = 0; i < 8; i++) {
        randFoodPosition();
        foods.push({x: foodX, y: foodY});
    }
}

function randFoodPosition() {
    for (foodX = Math.floor((Math.random() * canvasH) / snakeH) * snakeH; foodX == 0 || foodX == canvasW - snakeH; foodX = Math.floor((Math.random() * canvasH) / snakeH) * snakeH) {}
    for (foodY = Math.floor((Math.random() * canvasH) / snakeH) * snakeH; foodY == 0 || foodY == canvasH - snakeH; foodY = Math.floor((Math.random() * canvasH) / snakeH) * snakeH) {}
}

function handleDirection() {
    if (downPressed && dy == 0) {
        dy = snakeW;
        dx = 0;
    }
    if (rightPressed && dx == 0) {
        dx = snakeW;
        dy = 0;
    }
    if (upPressed && dy == 0) {
        dy = -snakeW;
        dx = 0;
    }
    if (leftPressed && dx == 0) {
        dx = -snakeW;
        dy = 0;
    }
}

function snakeNavigation() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    if (e.key == "ArrowRight") {
        rightPressed = true;
    }
    if (e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if (e.key == "ArrowUp") {
        upPressed = true;
    }
    if (e.key == "ArrowDown") {
        downPressed = true;
    }
}

function handleKeyUp(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false;
    }
    if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if (e.key == "ArrowUp") {
        upPressed = false;
    }
    if (e.key == "ArrowDown") {
        downPressed = false;
    }
}

function shiftColor() {
    for (let i = 1; i < snakes.length-1; i++) {
        snakes[i].c = snakes[i+1].c;
    }
}

function getRandColor() {
    const choice = ['0','1','2','3','4','5','6','7','8',
    '9','a','b','c','d','e','f'];
    let c1 = '#';
    let c2 = '0';
    let c3 = ''
    for (let i = 0; i < 2; i++) {
        c1 += choice[rand(8)];
    }
    for (let i = 0; i < 1; i++) {
        c2 += choice[rand(choice.length)];
    }
    for (let i = 0; i < 2; i++) {
        c3 += choice[rand(8)];
    }
    return c1+c2+c3;
}

function rand(max) {
    return Math.floor(Math.random() * max);
}