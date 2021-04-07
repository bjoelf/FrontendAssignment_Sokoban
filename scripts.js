//------ global varibles ---------------------------------------
const gameBoard = document.getElementById("board");
var loopPos = [];
var userWant = [];

//------- Game setup----------------------------------

function initBoard() {
  console.log(tileMap01.width);
  console.log(tileMap01.height);

  for (let h = 0; h < tileMap01.height; ++h) {
    for (let w = 0; w < tileMap01.width; ++w) {
      loopPos = [h, w];
      makeSokobanBox(tileMap01.mapGrid[h][w][0]);
    }
  }
}

function makeSokobanBox(type) {
  var newBox = document.createElement("div");
  newBox.curPos = loopPos;
  newBox.classList.add("box");
  //console.log(newBox.curPos); // funkar!

  //assign props depending on box type
  switch (type) {
    case "W":
      newBox.classList.add("wallBox");
      break;
    case "B":
      newBox.classList.add("crateBox");
      break;
    case "P":
      newBox.classList.add("player");
      break;
    case "G":
      newBox.classList.add("goal");
      break;
    default:
  }
  gameBoard.appendChild(newBox);
}

//------- Game running----------------------------------

function checkKey(e) {
  if (e.keyCode == "38") {
    userIntent("UP");
  } else if (e.keyCode == "40") {
    userIntent("DOWN");
  } else if (e.keyCode == "37") {
    userIntent("LEFT");
  } else if (e.keyCode == "39") {
    userIntent("RIGHT");
  }
}

function userIntent(moveDirection) {
  // test logging
  //console.log(moveDirection);
  //document.getElementById("keyLog").innerHTML = document.getElementsByClassName("player")[0].curPos;

  //set current pos to calculate intent...
  userWant = document.getElementsByClassName("player")[0].curPos;
  document.getElementById("keyLog").innerHTML = userWant;

  switch (moveDirection) {
    case "UP":
      if (Number(userWant[0]) > Number(0)) {
        userWant[0] = Number(userWant[0]) - Number(1);
      }
      break;
    case "DOWN":
      if (Number(userWant[0]) < Number(tileMap01.height -1)) {
        userWant[0] = Number(userWant[0]) + Number(1);
      }
      break;
    case "LEFT":
      if (Number(userWant[1]) > Number(0)) {
        userWant[1] = Number(userWant[1]) - Number(1);
      }
      break;
    case "RIGHT":
      if (Number(userWant[1]) < Number(tileMap01.width) -1) {
        userWant[1] = Number(userWant[1]) + Number(1);
      }
      break;
  }
  document.getElementById("targetLog").innerHTML = userWant;
}

function move() {

  //fortsätt här efter lunch

  



}

//------ run code lines ---------------------------------------------
document.getElementsByTagName("body")[0].style.backgroundColor = "darkgray";
document.onkeydown = checkKey;
initBoard();
