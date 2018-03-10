var c;
var ctx;
var board = [];

var anim; // Interval for stepping through life
var intervalTimer = 100;

window.onload = function () {

  // Canvas Setup
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  board = createBoard(50, 50, false);

  drawBoard();

  // Cell Toggle.
  canv.addEventListener("click", function(event){
    var i = parseInt(event.offsetX/10);
    var j = parseInt(event.offsetY/10);
    board[i][j] = !board[i][j];
    drawBoard();
  });


  // Event listener for speed controller
  document.getElementById("speed").addEventListener("change", function(event){
    intervalTimer = event.target.value;
    setSpeed();
  })
}

// User Input functions
function clearBoard(){
    board = createBoard(50, 50, false);
    drawBoard();
}

function setSpeed() {
  clearInterval(anim);
  anim = setInterval(function(){
    lifeStep();
    drawBoard();
  }, 1000/intervalTimer);
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

// Canvas draw handling
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


// Board control functions
function createBoard(height, width, value) {
  var tempBoard = [];
  for (var i = 0; i < height; i++)  {
    var row = [];
    for (var j = 0; j < width; j++)  {
      row.push(value);
    }
    tempBoard.push(row);
  }
  return tempBoard;
}

// Game of life control rules
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
