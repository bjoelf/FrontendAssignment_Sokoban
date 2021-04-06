//------ global varibles ---------------------------------------
const gameBoard = document.getElementById("board");

//------- functions and metods----------------------------------

function initBoard() {
  var blackBoxBool = true;
  //var boxWidth = tileMap01.width;
  //var boxHeight = tileMap01.height;
  var boxCode = "";

  console.log(tileMap01.width);
  console.log(tileMap01.height);

  //För varje rad...
  for (let h = 0; h < tileMap01.height; ++h) {
    console.log(h);

    // för varje box på en viss rad.
    for (let w = 0; w < tileMap01.width; ++w) {
      console.log(w);

      //console.log(tileMap01.mapGrid[w][h][0]);
      makeSokobanBox(tileMap01.mapGrid[h][w][0]);
    }
  }
}

function makeSokobanBox(type) {
  var newBox = document.createElement("div");
  newBox.classList.add("box");
  //console.log(type);

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

function move(offsetPos) {
  var playerElement = document.getElementsByClassName("player")[0];
  var playerNextElementId = Number(playerElement.id) + Number(offsetPos);
  var playerNextBox = document.getElementById(playerNextElementId);
  console.log(playerNextBox);

  if (playerNextElementId !== 0 && playerNextElementId <= idCounter) {
    playerElement.classList.toggle("player");
    playerNextBox.classList.toggle("player");
  }
}

function moveup() {
  console.log("moveup");
}

function movedown() {
  console.log("movedown");
}

function moveleft() {
  console.log("moveleft");
}

function moveright() {
  console.log("moveright");
}

function checkKey(e) {
  //https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
  if (e.keyCode == "38") {
    console.log("up arrow");
  } else if (e.keyCode == "40") {
    console.log("down arrow");
  } else if (e.keyCode == "37") {
    console.log("left arrow");
  } else if (e.keyCode == "39") {
    console.log("right arrow");
  }
}

//fortsätt här...
function move(offsetPos) {
    var playerElement = document.getElementsByClassName("player")[0];
    var playerNextElementId = Number(playerElement.id) + Number(offsetPos);
    var playerNextBox = document.getElementById(playerNextElementId);
    console.log(playerNextBox);

    if (playerNextElementId !== 0 && playerNextElementId <= idCounter) {
        playerElement.classList.toggle("player");
        playerNextBox.classList.toggle("player");
    }


}


//------ run code lines ---------------------------------------------
document.getElementsByTagName("body")[0].style.backgroundColor = "darkgray";
document.onkeydown = checkKey;
initBoard();
