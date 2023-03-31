//CANVAS ELEMENTS
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
cvs.height = 500;
cvs.width = 500;



// //GAME VARIABLES/CONSTANTS
let speed = 3;
// const paddleWidth = 100;
// const paddleBottom = 50;
// const paddleHeight = 20;
// let leftArrow = false;
// let rightArrow = false;
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



// //CONTROLING THE PADDLE
// document.addEventListener("keydown", function(event){
//   if(event.keyCode == 37){
//       leftArrow = true;
//   }else if(event.keyCode == 39){
//       rightArrow = true;
//   }
// });
// document.addEventListener("keyup", function(event){
//   if(event.keyCode == 37){
//       leftArrow = false;
//   }else if(event.keyCode == 39){
//       rightArrow = false;
//   }
// });


// function movePaddle(){
//     if(rightArrow && paddle.x + paddle.width < cvs.width){
//       paddle.x += paddle.dx;
//     }else if(leftArrow && paddle.x > 0){
//       paddle.x -= paddle.dx;
//     }
// }

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
//     if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
//         ball.dx = - ball.dx;
//     }
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

// //COLLISION DETECTION WHEN BALL HITS PADDLE
// function ballPaddleCollision(){
//     if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y +
//       paddle.height && ball.y > paddle.y ){
//         //CHECK WHERE BALL HITS PADDLE
//           let collisionPoint = ball.x - (paddle.x + paddle.width/2);
//         // NORMALIZE VALUES TO GET POINTS BTWN -1 AND 1 
//           collisionPoint = collisionPoint / (paddle.width/2);
//         //CALCULATE THE ANGLE BALL IS SENT, MAX ANGLE IS 60 DEGREES
//           let angle = collisionPoint * Math.PI/3;
//           ball.dx = ball.speed * Math.sin(angle);
//           ball.dy = - ball.speed * Math.cos(angle);
//       }

// }

// //CREATING THE BRICKS
// const brick = {
//   row : 3,
//   column : 5,
//   width : 55,
//   height : 20,
//   leftOffSet: 20,
//   topOffSet : 20,
//   topMargin : 40,
//   fillColor : "2e3548",
//   strokeColor : "#FFF"
// }

// let bricks = [];

// function createBricks(){
//     for(let r = 0; r < brick.row; r++){
//         bricks[r] = [];
//         for(let c = 0; c < brick.column; c++){
//           bricks[r][c] = {
//             x : c * (brick.leftOffSet + brick.width) + brick.leftOffSet,
//             y : r * (brick.topOffSet + brick.height) + brick.topOffSet + brick.topMargin,
//             status : true
//           }
//        }
//     }
// }

// createBricks();

// function drawBricks(){
//   for(let r = 0; r < brick.row; r++){
//       for(let c = 0; c < brick.column; c++){
//           let b = bricks[r][c];
//           if(b.status){  // if the brick isn't broken
//               ctx.fillStyle = brick.fillColor;
//               ctx.fillRect(b.x, b.y, brick.width, brick.height);
//               ctx.strokeStyle = brick.strokeColor;
//               ctx.strokeRect(b.x, b.y, brick.width, brick.height);
//           }
//       }
//   }
// }

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

    ball.x += ball.dx;
    ball.y += ball.dy;

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

