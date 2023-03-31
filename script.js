//CANVAS ELEMENTS
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
cvs.height = 500;
cvs.width = 500;



// //GAME VARIABLES/CONSTANTS
let speed = 3;
let leftArrow = false;
let rightArrow = false;

// let life = 2;
// let score = 0;
// const scoreUnit = 5;
// let level = 1;
// const maxLevel = 5;
// const ballRadius = 8;

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

// function drawPaddle(){
//   ctx.fillStyle = "#2e3548";
//   ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

//   ctx.strokeStyle = "#ff494e";
//   ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
// }



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




// //MAKING BALL MOVE
// function moveBall(){
//   ball.x += ball.dx;
//   ball.y += ball.dy;
// }

// //COLLISION DETECTION WHEN BALL HITS WALL

// function ballWallCollision(){

//     if(ball.y - ball.radius < 0){
//         ball.dy = -ball.dy;
//     }
//     if(ball.y + ball.radius > cvs.height){
//       life--; //LOSE A LIFE
//       // console.log(life)
//       // lives.style.display = "none";
//       // resetBall(); 
//     }
// }


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
      const brickX = c * (brick.width + brick.padding) + brick.leftOffSet;
      const brickY = r * (brick.height + brick.padding) + brick.topOffSet;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.fillRect(brickX, brickY, brick.width, brick.height);
      ctx.fillStyle = brick.fillColor;
    }
  }
}



// //COLLISION DETECTION FOR BRICKS
// function ballBrickCollision(){
//   for(let r = 0; r < brick.row; r++){
//       for(let c = 0; c < brick.column; c++){
//           let b = bricks[r][c];
//           if(b.status){// if the brick isn't broken
//               if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
//                   ball.dy = - ball.dy;
//                   b.status = false; // the brick is broken
//                   score += scoreUnit;
//               }
//           }
//       }
//   }
// }

// //DISPLAYING THE GAME STATS
// function showGameStats(text, textX, textY){
//     ctx.fillStyle = "#FFF";
//     ctx.font = "25px Bowlby One";
//     ctx.fillText(text, textX, textY);   
// }

// function showGameSymbols(img, imgX, imgY){
//     ctx.drawImage(img, imgX, imgY,width = 25, height = 25);  
// }
// //RESETING THE BALL
// function resetBall(){
//   ball.x = cvs.width/2;
//   ball.y = paddle.y - ballRadius;
//   ball.dx = 3 * (Math.random() * 2 - 1);
//   ball.dy = -3;
// }
// //MAIN FUNCTIONS
function play(){
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ball.draw();
    paddle.draw();
    drawBricks();
    movePaddle();
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


// function update(){
//     movePaddle();
//     moveBall();
//     ballWallCollision();
//     ballPaddleCollision();
//     ballBrickCollision();
    
// }



// function loop(){

//   draw();

//   update();


// }
// loop();

