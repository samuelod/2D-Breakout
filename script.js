// SELECT CANVAS ELEMENTS
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
cvs.height = 500;
cvs.width = 400;
ctx.lineWidth = 3;


//GAME VARIABLES/CONSTANTS
const paddleWidth = 100;
const paddleBottom = 50;
const paddleHeight = 20;
let leftArrow = false;
let rightArrow = false;
const ballRadius = 8;

// CREATING THE PADDLE 
const paddle = {
  x : cvs.width/2 - paddleWidth/2,
  y : cvs.height - paddleBottom - paddleHeight, //paddleBottom is distance btwn the bottom margin * bottom of paddle 
  width : paddleWidth,
  height : paddleHeight,
  dx: 5
}

function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = "#ff494e";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}



//CONTROLING THE PADDLE
document.addEventListener("keydown", function(event){
  if(event.keyCode == 37){
      leftArrow = true;
  }else if(event.keyCode == 39){
      rightArrow = true;
  }
});
document.addEventListener("keyup", function(event){
  if(event.keyCode == 37){
      leftArrow = false;
  }else if(event.keyCode == 39){
      rightArrow = false;
  }
});


function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
      paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
      paddle.x -= paddle.dx;
    }
}

//CREATING THE BALL
const ball = {
  x : cvs.width/2,
  y : paddle.y - ballRadius,
  radius : ballRadius,
  speed : 4,
  dx : 3,
  dy : -3
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "#ff494e";
  ctx.fill();
  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  ctx.closePath();
}

//MAKING BALL MOVE
function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;
}

//FUNCTIONS
function draw(){
    drawPaddle();
    drawBall();
}

//UPDATE GAME 
function update(){
    movePaddle();
    moveBall();
    
}


//GAME LOOP
function loop(){
  ctx.clearRect(0, 0, cvs.width, cvs.height)
  draw();

  update();

  requestAnimationFrame(loop);

}
loop();

