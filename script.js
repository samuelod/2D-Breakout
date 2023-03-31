//CANVAS ELEMENTS
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
cvs.height = 500;
cvs.width = 500;



// //GAME VARIABLES/CONSTANTS
let speed = 3;
let leftArrow = false;
let rightArrow = false;
let score = 0;


// // CREATING THE PADDLE 
let paddle = {
  x : cvs.width/2 - 76/2,
  width : 76,
  height : 10,
  draw : function() {
    ctx.fillStyle = "#FF8300";
    ctx.fillRect(this.x, cvs.height-this.height, this.width, this.height);
  }
};


//CONTROLING THE PADDLE
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightArrow = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftArrow = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightArrow = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftArrow = false;
  }
}


function movePaddle(){
  if(rightArrow){
    paddle.x += 7;
    if(paddle.x + paddle.width >= cvs.width){
      paddle.x = cvs.width - paddle.width;
    }
  }else if(leftArrow){
    paddle.x -= 7;
    if(paddle.x < 0){
      paddle.x = 0;
    }
  }
}


// //CREATING THE BALL 
let ball = {
  x : cvs.width/2,
  y : cvs.height - 50,
  dx : speed,
  dy : -speed * 1,
  radius : 7,
  draw : function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#FF8300";
    ctx.fill();
    ctx.closePath();
  }
};



// //CREATING THE BRICKS
let brick = {
  row : 3,
  column : 5,
  width : 70,
  height : 20,
  leftOffSet: 35,
  topOffSet : 30,
  padding : 20,
  fillColor :"#FF8300",
}

const bricks = [];
function createBricks(){
for (let c = 0; c < brick.column; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.row; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}


createBricks();

function drawBricks() {
  for (let c = 0; c < brick.column; c++) {
    for (let r = 0; r < brick.row; r++) {
      if (bricks[c][r].status == 1) {
      const brickX = c * (brick.width + brick.padding) + brick.leftOffSet;
      const brickY = r * (brick.height + brick.padding) + brick.topOffSet;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.fillRect(brickX, brickY, brick.width, brick.height);
      ctx.fillStyle = brick.fillColor;
      }  
    }
  }
}



// //COLLISION DETECTION FOR BRICKS

function collisionDetection() {
  for (let c = 0; c < brick.column; c++) {
    for (let r = 0; r < brick.row; r++) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (ball.x >= b.x && 
            ball.x <= b.x + brick.width &&
            ball.y >= b.y && 
            ball.y <= b.y + brick.height)
           {
              ball.dy *= -1;
              b.status = 0;
              score++
        }
      }
    }
  }
}
//DISPLAYING SCORE 
function showScore(){
  ctx.font = '16px Arial';
  ctx.fillStyle = "#FF8300";
  ctx.fillText("SCORE: " + score, 8, 20);
}

function levelUp(){
  if (score % 15 == 0 && score !=0){
    if(ball.y > cvs.height/2){
      createBricks();
    }
    if(gameLevelUp){
      if(ball.dy > 0){
          ball.dy += 2
          gameLevelUp = false;
      }else if(ball.dy < 0 ){
        ball.dy -= 1;
        gameLevelUp = false;
      }
    }
    if(score % 15 !=0){
      gameLevelUp = true;
    }
  }
}

let gameLevelUp = true;

// //MAIN FUNCTIONS
function play(){
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ball.draw();
    paddle.draw();
    drawBricks();
    movePaddle();
    collisionDetection();
    showScore();
    levelUp();
    // MOVING THE BALL
    ball.x += ball.dx;
    ball.y += ball.dy;
    //COLLISION DETECTION WHEN BALL HITS WALL
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
      ball.dx = - ball.dx;
    }
    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
      ball.dy = - ball.dy;
    }
    //COLLISION DETECTION WHEN BALL HITS PADDLE
    if (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width &&
        ball.y + ball.radius >= cvs.height - paddle.height)
        {
          ball.dy *= -1;
        }

    

    requestAnimationFrame(play);
    
}

play();



