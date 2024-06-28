let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let twoPlayerMode = true; // Starts in two-player mode

function makeMove(index) {
  if (!gameOver && board[index] === "") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
    if (!twoPlayerMode && currentPlayer === "O" && !gameOver) {
      setTimeout(makeAIMove, 500);
    }
  }
}

function toggleGameMode() {
  twoPlayerMode = !twoPlayerMode; 
  const modeButton = document.getElementById("modeButton");
  modeButton.innerText = twoPlayerMode ? "Two Players" : "Player vs. AI";
  resetBoard();
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6] 
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById("winner").innerHTML = `Player ${board[a]} wins!`;
      gameOver = true;
      setTimeout(resetBoard, 1500);
      return;
    }
  }

  if (!board.includes("") && !gameOver) {
    document.getElementById("winner").innerHTML = "It's a tie!";
    gameOver = true;
    setTimeout(resetBoard, 1500); 
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("winner").innerHTML = "";
  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.innerHTML = "";
  }
}

function makeAIMove() {
  let bestMove;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      if (checkWinner(board, "O")) {
        bestMove = i;
        board[i] = ""; 
        break;
      }
      board[i] = ""; 
    }
  }

  if (bestMove === undefined) {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        emptyCells.push(i);
      }
    }
    if (emptyCells.length > 0) {
      bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
  }

  makeMove(bestMove);
}
