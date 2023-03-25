// SELECT CANVAS ELEMENTS
const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
cvs.height = 500;
cvs.width = 400;

//GAME VARIABLES/CONSTANTS
const paddleWidth = 100;
const paddleBottom = 50;
const paddleHeight = 20;

// CREATE THE PADDLE 
const paddle = {
  x: cvs.width/2 - paddleWidth/2,
  y: cvs.height - paddleBottom - paddleHeight, //paddleBottom is distance btwn the bottom margin * bottom of paddle 
  width: paddleWidth,
  height: paddleHeight,
  dx: 5
}

function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = "#ff494e";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

drawPaddle();

