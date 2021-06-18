const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const netWidth = 4;
const netHeight = canvas.height;
const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;
let aPressed = false;
let yPressed = false;
const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FFF"
};
const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FFF",
    score: 0
};
const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FFF",
    score: 0
};
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: "#FFF"
};
var game = true;

window.addEventListener("keyup", spaceHit);

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
    switch (event.keyCode) {
        case 38:
            upArrowPressed = true;
            break;
        case 40:
            downArrowPressed = true;
            break;
        case 65:
            aPressed = true;
            break;
        case 89:
            yPressed = true;
            break;
    }
}

function keyUpHandler(event) {
    switch (event.keyCode) {
        case 38:
            upArrowPressed = false;
            break;
        case 40:
            downArrowPressed = false;
            break;
        case 65:
            aPressed = false;
            break;
        case 89:
            yPressed = false;
            break;
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}

function collisionDetect(player, ball) {
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function update() {
    if (upArrowPressed && player2.y > 0) {
        player2.y -= 5;
    } else if (downArrowPressed && (player2.y < canvas.height - player2.height)) {
        player2.y += 5;
    }
    if (aPressed && player1.y > 0) {
        player1.y -= 5;
    } else if (yPressed && (player1.y < canvas.height - player1.height)) {
        player1.y += 5;
    }
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
    }
    if (ball.x + ball.radius >= canvas.width) {
        player1.score += 1;
        if (player1.score >= 10) {
            game = false;
        }
        reset();
    }
    if (ball.x - ball.radius <= 0) {
        player2.score += 1;
        if (player2.score >= 10) {
            game = false;
        }
        reset();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //player2.y += ((ball.y - (player2.y + player2.height / 2.01))) * 0.08;

    let player = (ball.x < canvas.width / 2) ? player1 : player2;

    if (collisionDetect(player, ball)) {
        let angle = 0;
        if (ball.y < (player.y + player.height / 2)) {
          angle = -1 * Math.PI / 4;
        } else if (ball.y > (player.y + player.height / 2)) {
          angle = Math.PI / 4;
        }
    
        ball.velocityX = (player === player1 ? 1 : -1) * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);
    }
}

function render() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawNet();
    drawScore(canvas.width / 4, canvas.height / 6, player1.score);
    drawScore(3 * canvas.width / 4, canvas.height / 6, player2.score);
    drawPaddle(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawPaddle(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function drawNet() {
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.width, net.height);
}

function drawScore(x, y, score) {
    ctx.fillStyle = "#FFF";
    ctx.font = "35px monospace";
    ctx.fillText(score, x, y);
}

function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function gameLoop() {
    if (game) {
        update();
        render();
    } else {
        clearInterval(id);
        if (player1.score > player2.score) {
            document.getElementById("result").innerHTML = `
            <p class="result">The winner is Player 1</p>`;
            setTimeout(function() {document.location.reload()}, 2000);
        } else {
            document.getElementById("result").innerHTML = `
            <p class="result">The winner is Player 2</p>`;
            setTimeout(function() {document.location.reload()}, 2000);
        }
    }
}

function spaceHit(event) {
    if (event.keyCode === 32) {
        window.removeEventListener("keyup", spaceHit);
        document.getElementById("start").innerHTML = "";
        id = setInterval(gameLoop, 1000 / 60);
    }
}

//id = setInterval(gameLoop, 1000 / 60);