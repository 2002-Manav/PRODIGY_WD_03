let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
const message = document.getElementById("message");

function makeMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function drawWinningLine(winningCombination) {
  const line = document.getElementById("winning-line");
  const cell0 = document
    .querySelectorAll(".cell")
    [winningCombination[0]].getBoundingClientRect();
  const cell2 = document
    .querySelectorAll(".cell")
    [winningCombination[2]].getBoundingClientRect();
  const linePosition = {
    top: (cell0.top + cell2.top) / 2 + window.scrollY + cell0.height / 2 - 2.5,
    left: (cell0.left + cell2.left) / 2 + cell0.width / 2,
    width:
      Math.hypot(cell0.left - cell2.left, cell0.top - cell2.top) + cell0.width,
  };

  line.style.transform = `scaleX(${linePosition.width / 100})`;
  line.style.top = `${linePosition.top}px`;
  line.style.left = `${linePosition.left}px`;
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.innerText = `Player ${board[a]} Wins!`;
      gameOver = true;
      drawWinningLine(combo);
      showResultScreen(`Player ${board[a]} Wins!`);
      return;
    }
  }

  if (!board.includes("")) {
    message.innerText = "It's a Draw!";
    gameOver = true;
    showResultScreen("It's a Draw!");
  }
}

function showResultScreen(message) {
  const resultScreen = document.querySelector(".result-screen");
  const resultMessage = document.getElementById("result-message");
  resultMessage.innerText = message;
  resultScreen.style.display = "block";
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  message.innerText = "Player X's Turn";
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));

  const winningLine = document.getElementById("winning-line");
  winningLine.style.transform = "scaleX(0)";

  const resultScreen = document.querySelector(".result-screen");
  resultScreen.style.display = "none";
}

resetGame();
