const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasH = canvas.height;
const canvasW = canvas.width;

let ball,platforms,platformH,platformW,plDiff,plSpeed,leftPressed,rightPressed,count,moveSpeed,interval,score,scoreInterval,gravity,dropSpeed,holeWidth;

setInitialVariables();
drawBall();
drawPlatforms();
movePlatforms();
navigateBall();
drawScore();

scoreInterval = setInterval(() => {
    score++
}, 1000);

function movePlatforms() {
    if (interval) return;

    interval = setInterval(() => {
        checkGameOver();
        addNewPlatform();
        findClosest();
        platforms.forEach((pl) => (pl.y -= plSpeed));
        ctx.clearRect(0,0,canvasW,canvasH);
        drawPlatforms();
        drawBall();
        drawScore();
        count++;
    }, 20);
}

function addNewPlatform() {
    if (count == Math.floor(plDiff / plSpeed)) {
        if (platforms.length > 10) {
            platforms.splice(0,3);
        }
    const lastPlatform = platforms[platforms.length - 1];
    platforms.push({x:0, y:lastPlatform.y + plDiff, holeX: randHoleX(), holeW: holeWidth});
    count = 0;
    }
}

function drawPlatforms() {
    platforms.forEach((pl) => {
        createPl(pl);
        createHole(pl);
    });

    function createHole(pl) {
        ctx.beginPath();
        ctx.rect(pl.holeX, pl.y, pl.holeW, platformH);
        ctx.fillStyle = '#bfa7e3';
        ctx.fill();
        ctx.closePath();
    }
    function createPl(pl) {
        ctx.beginPath();
        ctx.rect(pl.x, pl.y, platformW, platformH);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }
}

function findClosest() {
    const closest = platforms.find((pl) => ball.y < pl.y + 10 && ball.y > pl.y - ball.r);
    if (closest) {
        dropSpeed = 1;
        holeDrop(closest);
    } else {
        dropSpeed += gravity;
        ball.y += dropSpeed;
    }
}

function holeDrop(close) {
    if (ball.y >= close.y - ball.r - 2) {
        if (ball.x > close.holeX && ball.x < close.holeX + close.holeW) {
            ball.y += 5;
        } else {
            ball.y = close.y - ball.r - 2;
        }
    }
}

function drawBall() {
    // Ball Navigation
    if (leftPressed && ball.x - ball.r >= 0) {
        ball.x -= moveSpeed;
    }
    if (rightPressed && ball.x + ball.r <= canvasW) {
        ball.x += moveSpeed;
    }

    ctx.beginPath();
    const img = new Image();
    img.src = 'https://freepngimg.com/thumb/kitten/169073-picture-domestic-kitten-free-transparent-image-hq.png';
    ctx.drawImage(img, ball.x, ball.y, ball.r, ball.r);
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.fillText('Score: ' + score, canvasW-60, 10);
    ctx.closePath();
}

function navigateBall() { 
    document.addEventListener('keydown', (e) => {
         if (e.getModifierState('Control')) {
            if (e.key == "ArrowRight") {
                moveSpeed = 12;
            }
            if (e.key == "ArrowLeft") {
                moveSpeed = 12;
            }
        }
        console.log(e.key);
        if (e.key == "ArrowRight") {
            rightPressed = true;
        }
        if (e.key == "ArrowLeft") {
            leftPressed = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key == "ArrowRight") {
            rightPressed = false;
        }
        if (e.key == "ArrowLeft") {
            leftPressed = false;
        }
        moveSpeed = 8;
    });
}

function checkGameOver() {
    if (ball.y < 0) {
        alert('Game Over!');
        reset();
    }
    if (ball.y >= canvasH) {
        alert('You Won!');
        reset();
    }
}

function reset() {
    setInitialVariables();
    clearInterval(interval);
    clearInterval(scoreInterval);
    interval = scoreInterval = null;
}

function setInitialVariables() {
    interval = scoreInterval= null;
    leftPressed = rightPressed = false;
    holeWidth = 50;
    plDiff = 75;
    plSpeed = 3;
    platformW = canvasW;
    platformH = 10;
    ball = {x:250, y:10, r:20};
    platforms = [
        {x:0, y:canvasH, holeX: randHoleX(), holeW: holeWidth},
    ];
    count = 0;
    moveSpeed = 8;
    score = 0;
    gravity = 0.4;
    dropSpeed = 1;
}

function randHoleX() {
    return Math.floor(Math.random() * (canvasW - holeWidth));
}