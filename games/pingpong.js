const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasH = canvas.height;
const canvasW = canvas.width;

let ball, leftPaddle, rightPaddle, paddle, score, increment, dxOptions;

setInitialVariables();
drawBall();
drawScore();
drawBorder();
drawLeftPaddle();
drawRightPaddle();
moveBall();
moveLeftPaddle();

function moveLeftPaddle() {
    document.addEventListener('mousemove',(e)=>{
        leftPaddle.y = e.screenY - 100;
    });
}

function detectCollision() {
    // Detect Right Paddle Collision
    if (ball.x >= rightPaddle.x - ball.r) {
        ball.dx = -ball.dx;
        ball.dy += (ball.y + ball.dy - rightPaddle.y) / 100;
    }

    // Detect Left Paddle Collision
    if (ball.x <= 0 + ball.r + paddle.w && ball.y >= leftPaddle.y &&
        ball.y <= leftPaddle.y + paddle.h) {
        ball.dx = -ball.dx + 2 * increment;
        ball.dy += increment;
        score += 1;
    }

    // Detect Top and Bottom Collision
    if (ball.y >= canvasH - ball.r || ball.y <= 0 + ball.r) {
        ball.dy = -ball.dy;
    }

    // Detect Left Collision
    if (ball.x < 0 + ball.r) {
        alert('You Lose');
        setInitialVariables();
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    rightPaddle.y = ball.y - paddle.h/2;

    ctx.clearRect(0,0,canvasW,canvasH);

    detectCollision();
    drawBorder();
    drawBall();
    drawLeftPaddle();
    drawRightPaddle();
    drawScore();
    requestAnimationFrame(moveBall);
}

function drawBall() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#9BBEC8';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawLeftPaddle() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(leftPaddle.x, leftPaddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#435585';
    ctx.fill();

    ctx.stroke();
    ctx.closePath();
}

function drawRightPaddle() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(rightPaddle.x, rightPaddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#818FB4';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function setInitialVariables() {
    dxOptions = [1,2,1.5,1.25,1.75,2.5];
    ball = {x:250, y:225, r:10, dx:dxOptions[rand(dxOptions.length)], dy:1};
    leftPaddle = {x:0, y:(canvasH/2)-25};
    rightPaddle = {x:canvasW - 5, y:(canvasH/2)-25};
    paddle = {w: 5, h: 50};
    score = 0;
    increment = .1;
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.fillText('Score: ' + score, canvasW - 50, 10)
    ctx.closePath();
}

function drawBorder() {
    ctx.beginPath();
    ctx.setLineDash([5, 10]);
    ctx.moveTo(canvasW/2, 0);
    ctx.lineTo(canvasW/2, canvasH);
    ctx.stroke();
    ctx.closePath();
}

function rand(max) {
    return Math.floor(Math.random() * max);
}
