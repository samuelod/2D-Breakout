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
let numOfLives = 5;
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
  if(event.key == 37){
      leftArrow = true;
  }else if(event.key == 39){
      rightArrow = true;
  }
});
document.addEventListener("keyup", function(event){
  if(event.key == 37){
      leftArrow = false;
  }else if(event.key == 39){
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
  dx : 3 * (Math.random() * 2 - 1),
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

//COLLISION DETECTION WHEN BALL HITS WALL
function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    if(ball.y + ball.radius > cvs.height){
      numOfLives--; //LOSE A LIFE
      resetBall();
    }
}

//COLLISION DETECTION WHEN BALL HITS PADDLE
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y +
      paddle.height && ball.y > paddle.y ){
        //CHECK WHERE BALL HITS PADDLE
          let collisionPoint = ball.x - (paddle.x + paddle.width/2);
        // NORMALIZE VALUES TO GET POINTS BTWN -1 AND 1 
          collisionPoint = collisionPoint / (paddle.width/2);
        //CALCULATE THE ANGLE BALL IS SENT, MAX ANGLE IS 60 DEGREES
          let angle = collisionPoint * Math.PI/3;
          ball.dx = ball.speed * Math.sin(angle);
          ball.dy = - ball.speed * Math.cos(angle);
      }

}

//RESETING THE BALL
function resetBall(){
  ball.x = cvs.width/2;
  ball.y = paddle.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
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
    ballWallCollision();
    ballPaddleCollision();
    
}


//GAME LOOP
function loop(){
  ctx.clearRect(0, 0, cvs.width, cvs.height)
  draw();

  update();

  requestAnimationFrame(loop);

}
loop();

