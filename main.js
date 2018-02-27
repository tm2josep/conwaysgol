var c;
var ctx;
var board = [];

window.onload = function () {
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  board = createBoard(50, 50);
  drawBoard();

  canv.addEventListener("click", function(event){
    console.log(event);
    var i = parseInt(event.x/10);
    var j = parseInt(event.y/10);
    board[i][j] = !board[i][j];
    drawBoard();
  })
}


function createBoard(height, width) {
  var tempBoard = [];
  for (var i = 0; i < height; i++)  {
    var row = [];
    for (var j = 0; j < width; j++)  {
      row.push(false);
    }
    tempBoard.push(row);
  }
  return tempBoard;
}

function drawBoard() {
  var live = 0;

  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < 50; j++) {
      if(board[i][j]) {
        ctx.fillStyle="#ff0000";
        live++;
      } else {
        ctx.fillStyle="#000000"
      }

      ctx.fillRect(i*10 + 1, j*10 + 1, 9, 9);
    }
  }

  document.getElementById("living").innerText = ("Living: " + live);
}

function findNeighbors(i, j) {
  var n = 0;

  if(checkValidity(i-1, j-1) && board[i-1][j-1]) n++;
  if(checkValidity(i  , j-1) && board[i  ][j-1]) n++;
  if(checkValidity(i+1, j-1) && board[i+1][j-1]) n++;
  if(checkValidity(i-1, j  ) && board[i-1][j  ]) n++;
  if(checkValidity(i+1, j  ) && board[i+1][j  ]) n++;
  if(checkValidity(i-1, j+1) && board[i-1][j+1]) n++;
  if(checkValidity(i  , j+1) && board[i  ][j+1]) n++;
  if(checkValidity(i+1, j+1) && board[i+1][j+1]) n++;

  return n;
}

function checkValidity(i, j){
  return (board[i] != undefined && board[i][j] != undefined);
}

function lifeStep() {
  var tempBoard = createBoard(50, 50);
  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < 50; j++) {
      var n = findNeighbors(i,j);
      if(board[i][j]) {
        if(n < 2)
          tempBoard[i][j] = false;
        else if(n > 3)
          tempBoard[i][j] = false;
        else
          tempBoard[i][j] = true;
      } else {
        if(n == 3)
          tempBoard[i][j] = true;
      }
    }
  }
  board = tempBoard;
}

var anim;

function setSpeed() {
  var value = parseInt(document.getElementById("speed").value)
  clearInterval(anim);
  anim = setInterval(function(){
    lifeStep();
    drawBoard();
  }, 1000/value);
}

function stopSteps() {
  clearInterval(anim);
}

function randomize() {
  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < 50; j++) {
      board[i][j] = (Math.random() > 0.5);
    }
  }

  drawBoard();
}
