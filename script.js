const board = document.getElementById("tic-tac-toe-board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
});

restartButton.addEventListener("click", restartGame);

function handleCellClick(index) {
    if (!isGameActive || cells[index].getAttribute("data-cell")) {
        return;
    }

    cells[index].setAttribute("data-cell", currentPlayer);
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
        isGameActive = false;
        message.textContent = `${currentPlayer} wins!`;
        return;
    }

    if ([...cells].every(cell => cell.getAttribute("data-cell"))) {
        isGameActive = false;
        message.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            cells[a].getAttribute("data-cell") === currentPlayer &&
            cells[b].getAttribute("data-cell") === currentPlayer &&
            cells[c].getAttribute("data-cell") === currentPlayer
        ) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    cells.forEach(cell => {
        cell.removeAttribute("data-cell");
        cell.textContent = "";
    });
    currentPlayer = "X";
    isGameActive = true;
    message.textContent = "Player X's turn";
}
