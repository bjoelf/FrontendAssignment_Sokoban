var iImgOffset = 2;
function AjaxDummy() {}
var doc = window.document;
var ElapsedTime, StartTime, EndTime, BoardCompleted;
var HistoryPlaying = false;
Cells = new Array(BoardXMax);
for (var i = 0; i < BoardXMax; i++) {
  Cells[i] = new Array(BoardYMax);
}
var Pic = new Array(8);
for (var i = 0; i < 8; i++) {
  Pic[i] = new Image();
  Pic[i].src = "/img/i" + i + ".gif";
}
function Timer() {
  if (BoardCompleted) return;
  var Now = new Date();
  var s = Math.floor(Now.getTime() / 1000 - StartTime);
  ElapsedTime = s;
  var h = Math.floor(s / 3600);
  s -= h * 3600;
  if (h < 10) h = "0" + h;
  var m = Math.floor(s / 60);
  s -= m * 60;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  $("Time").innerHTML = (h == "00" ? "" : h + ":") + m + ":" + s;
}
function KeyDown(k) {
  if (HistoryPlaying || HighScoreViewing) {
    return false;
  }
  switch (k) {
    case 81:
      MoveBack(1);
      break;
    case 37:
      Move("l");
      break;
    case 38:
      Move("u");
      break;
    case 39:
      Move("r");
      break;
    case 40:
      Move("d");
      break;
    case 50:
      Move("d");
      break;
    case 52:
      Move("l");
      break;
    case 53:
      Move("d");
      break;
    case 54:
      Move("r");
      break;
    case 56:
      Move("u");
      break;
    case 65458:
      Move("d");
      break;
    case 65460:
      Move("l");
      break;
    case 65461:
      Move("d");
      break;
    case 65462:
      Move("r");
      break;
    case 65464:
      Move("u");
      break;
    default:
      return false;
  }
  return true;
}
function Init() {
  for (var i = 0; i < BoardXMax; i++)
    for (var j = 0; j < BoardYMax; j++) {
      Cells[i][j] = 0;
    }
  var c;
  i = 0;
  j = 0;
  for (var k = 0; k < Board.length; k++) {
    c = Board.charAt(k);
    if (c == ".") Cells[i][j] = 1;
    else if (c == "#") Cells[i][j] = 2;
    else if (c == "$") Cells[i][j] = 3;
    else if (c == "*") Cells[i][j] = 4;
    else if (c == "@") {
      Cells[i][j] = 5;
      PosX = i;
      PosY = j;
    } else if (c == "+") {
      Cells[i][j] = 6;
      PosX = i;
      PosY = j;
    } else if (c == "x") Cells[i][j] = 7;
    else if (c != " " && c != "_" && c != "!") alert(c);
    if (c == "!") {
      j++;
      i = 0;
    } else i++;
  }
  MoveCount = 0;
  MoveCountMax = 0;
  RefreshScreen();
  var Now = new Date();
  StartTime = Now.getTime() / 1000;
  BoardCompleted = false;
}
function checkBoardCompleted() {
  for (var i = 0; i < BoardXMax; i++)
    for (var j = 0; j < BoardYMax; j++) {
      if (Cells[i][j] == 3) return false;
    }
  return true;
}
function Move(iDirection) {
  if (BoardCompleted) return;
  var dX, dY;
  switch (iDirection) {
    case "u":
      dX = 0;
      dY = -1;
      break;
    case "r":
      dX = 1;
      dY = 0;
      break;
    case "d":
      dX = 0;
      dY = 1;
      break;
    case "l":
      dX = -1;
      dY = 0;
      break;
  }
  if (Cells[PosX + dX][PosY + dY] == 2) {
    return;
  }
  if (Cells[PosX + dX][PosY + dY] > 2) {
    if (Cells[PosX + 2 * dX][PosY + 2 * dY] >= 2) {
      return;
    }
    Cells[PosX + 2 * dX][PosY + 2 * dY] += 3;
    RefreshCell(PosX + 2 * dX, PosY + 2 * dY);
    Cells[PosX + dX][PosY + dY] += 2;
    RefreshCell(PosX + dX, PosY + dY);
    Cells[PosX][PosY] -= 5;
    RefreshCell(PosX, PosY);
    iDirection = iDirection.toUpperCase();
    BoardCompleted = checkBoardCompleted();
  } else {
    Cells[PosX + dX][PosY + dY] += 5;
    RefreshCell(PosX + dX, PosY + dY);
    Cells[PosX][PosY] -= 5;
    RefreshCell(PosX, PosY);
  }
  PosX += dX;
  PosY += dY;
  if (History[MoveCount] != iDirection) {
    History[MoveCount] = iDirection;
    MoveCountMax = MoveCount + 1;
  }
  MoveCount++;
  if (MoveCountMax < MoveCount) MoveCountMax = MoveCount;
  if (MoveCount == HistorySize) {
    alert("Sorry, no more moves. Please try again !");
  }
  $("Moves").innerHTML = MoveCount;
  if (BoardCompleted) {
    doc.images[0].src = Pic[4].src;
    if (!HistoryPlaying) {
      var data =
        CollectionId +
        "_" +
        CollectionLevel +
        "_" +
        ElapsedTime +
        "_" +
        History.join("");
      AjaxExecute("/save.php", "d=" + data, AjaxSaveReturn);
    }
  }
}
function AjaxSaveReturn() {
  AjaxExecute("/cron-high-score.php", "", AjaxDummy);
}
function MoveBack(mm) {
  var dX, dY;
  for (var i = 0; i < mm; i++) {
    if (MoveCount == 0) return;
    if (BoardCompleted) {
      BoardCompleted = false;
      doc.images[0].src = Pic[3].src;
    }
    MoveCount--;
    switch (History[MoveCount].toLowerCase()) {
      case "u":
        dX = 0;
        dY = -1;
        break;
      case "r":
        dX = 1;
        dY = 0;
        break;
      case "d":
        dX = 0;
        dY = 1;
        break;
      case "l":
        dX = -1;
        dY = 0;
        break;
    }
    PosX -= dX;
    PosY -= dY;
    if (History[MoveCount] < "Z") {
      Cells[PosX + 2 * dX][PosY + 2 * dY] -= 3;
      RefreshCell(PosX + 2 * dX, PosY + 2 * dY);
      Cells[PosX + dX][PosY + dY] -= 2;
      RefreshCell(PosX + dX, PosY + dY);
      Cells[PosX][PosY] += 5;
      RefreshCell(PosX, PosY);
    } else {
      Cells[PosX + dX][PosY + dY] -= 5;
      RefreshCell(PosX + dX, PosY + dY);
      Cells[PosX][PosY] += 5;
      RefreshCell(PosX, PosY);
    }
    $("Moves").innerHTML = MoveCount;
  }
}
function MoveForward(mm) {
  for (var i = 0; i < mm; i++) {
    if (MoveCount >= MoveCountMax) {
      return;
    }
    Move(History[MoveCount].toLowerCase());
  }
}
var iTimerHistory;
var Context_History;
var Context_Cells;
var Context_PosX;
var Context_PosY;
function PlayHistory_() {
  MoveForward(1);
  if (MoveCount >= MoveCountMax) {
    HistoryPlaying = false;
    History = new Array(HistorySize);
    $("buttonPlayHistory").innerHTML = "Play";
    return;
  }
  iTimerHistory = setTimeout(PlayHistory_, 333);
}
function PlayHistory() {
  if (HistoryPlaying) {
    clearTimeout(iTimerHistory);
    History = new Array(HistorySize);
    $("buttonPlayHistory").innerHTML = "Play";
  } else {
    if (
      History.join("") != "" &&
      confirm("Your moves will be deleted. Continue ?") == false
    ) {
      return;
    }
    Init(0);
    History = ScoreHistory;
    MoveCount = 0;
    MoveCountMax = History.length;
    clearTimeout(iTimerHistory);
    iTimerHistory = setTimeout(PlayHistory_, 333);
    $("buttonPlayHistory").innerHTML = "Stop";
    $("HistoryMessage").innerHTML = "Keys locked. Press [Restart] to play";
  }
  HistoryPlaying = !HistoryPlaying;
}
function RefreshCell(i, j) {
  doc.images[i + j * BoardXMax + 1 + iImgOffset].src = Pic[Cells[i][j]].src;
}
function RefreshScreen() {
  for (var i = 0; i < BoardXMax; i++)
    for (var j = 0; j < BoardYMax; j++) {
      doc.images[i + j * BoardXMax + 1 + iImgOffset].src = Pic[Cells[i][j]].src;
    }
  $("Moves").innerHTML = MoveCount;
}
function onKeyDown(e) {
  var k = window.event ? event.keyCode : e.keyCode;
  var iArrowKey = KeyDown(k);
  if (iArrowKey) return false;
}
document.onkeydown = onKeyDown;
