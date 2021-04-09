//------ global varibles ---------------------------------------
const gameBoard = document.getElementById("board");
var playerpos = {
  w: -1,
  h: -1,
  nextBox: function (x, y) {

  },
};
var starttime;

//------- Game setup----------------------------------
function initBoard() {
  for (let h = 0; h < tileMap01.height; ++h) {
    for (let w = 0; w < tileMap01.width; ++w) {
      makeSokobanBox(tileMap01.mapGrid[h][w][0], h, w);
    }
  }
}

function makeSokobanBox(type, h, w) {
  var newBox = document.createElement("div");
  newBox.id = "h" + h + "w" + w;

  newBox.classList.add("box");

  //assign props depending on box type
  switch (type) {
    case "P":
      newBox.classList.add("player");
      playerpos.w = w;
      playerpos.h = h;
      break;
    case "W":
      newBox.classList.add("wallBox");
      break;
    case "B":
      newBox.classList.add("crateBox");
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
    move(0, -1);
  } else if (e.keyCode == "40") {
    move(0, 1);
  } else if (e.keyCode == "37") {
    move(-1, 0);
  } else if (e.keyCode == "39") {
    move(1, 0);
  }
}

function move(x, y) {

  //start clock at first keystroke
if (typeof starttime === 'undefined') {
  starttime = new Date();
  console.log("set startclock");
}


  //get net box
  var nextVertical = Number(playerpos.h) + Number(x);
  var nextHorisontal = Number(playerpos.w) + Number(y);
  var nextId = "h" + nextHorisontal + "w" + nextVertical;

  //get player element and next element
  var playerBox = document.getElementsByClassName("player")[0];
  var nextBox = document.getElementById(nextId);

  //Game start
  console.log("Start game logic");
  if (
    nextBox.classList.contains("crateBox") ||
    nextBox.classList.contains("goalCrate")
  ) {
    console.log("Try push cratebox");
    var doubleNextVertical = Number(playerpos.h) + Number(x * 2);
    var doubleNextHorisontal = Number(playerpos.w) + Number(y * 2);
    var doubleNextId = "h" + doubleNextHorisontal + "w" + doubleNextVertical;
    var doubleNextBox = document.getElementById(doubleNextId);

    // Only move cratebox if no wall, crate nor goalcrate behind...
    if (
      !doubleNextBox.classList.contains("wallBox") &&
      !doubleNextBox.classList.contains("crateBox") &&
      !doubleNextBox.classList.contains("goalCrate")
    ) {
      //test if goal behind box, toggle some css.
      if (doubleNextBox.classList.contains("goal")) {
        console.log("Move cratebox into goal area");
        doubleNextBox.classList.toggle("goalCrate");

        //test if inside goal area
        if (nextBox.classList.contains("goal")) {
          console.log("Move cratebox inside goal area");
          nextBox.classList.toggle("goalCrate");
          nextBox.classList.toggle("crateBox");
        }
      } else {
        //no goal in sight, move crate
        doubleNextBox.classList.toggle("crateBox");
      }
      nextBox.classList.toggle("crateBox");
      togglePlayer(playerBox, nextBox);
      updatePlayerPos(nextVertical, nextHorisontal);
    }
  } else if (!nextBox.classList.contains("wallBox")) {
    console.log("Move player only");

    // If no wall, move player only.
    togglePlayer(playerBox, nextBox);
    updatePlayerPos(nextVertical, nextHorisontal);
    SecondsSinceStart();
  }
  done();
}

function SecondsSinceStart() {
  var now =  new Date();
  var difference = Math.abs(now - starttime) / 1000;
  document.getElementById("clock").innerHTML = difference;
}

function done() {
  var remain = document.getElementsByClassName("goal").length - document.getElementsByClassName("goalCrate").length;
  document.getElementById("goalsleft").innerHTML = remain;
  if (remain == 0 ) {
    document.getElementById("win").innerHTML = "You won!!";
  }
  console.log(remain);
}

function togglePlayer(boxP, boxN) {
  boxP.classList.toggle("player");
  boxN.classList.toggle("player");
}
function updatePlayerPos(nV, nH) {
  playerpos.h = nV;
  playerpos.w = nH;
}

//------ run code lines ---------------------------------------------
initBoard();
document.getElementsByTagName("body")[0].style.backgroundColor = "darkgray";
document.onkeydown = checkKey;
