import { ChessGame, makeMove, getValidMoves } from "./game.js";
import { isCheckmate, isStalemate } from "./validators.js";

const boardDiv = document.querySelector(".board");
const currentPlayerSpan = document.querySelector(".current-player");

let squares = null

let game = new ChessGame('Vaibhav', 'Shubham');

// Displaying Board
function setBoard() {
    boardDiv.innerHTML = ''
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var color = (i + j) % 2 == 0 ? 'white' : 'black'
            boardDiv.innerHTML += `<div class="square ${color}" data-row="${i}" data-col="${j}">${game.board.board[i][j] ? game.board.board[i][j].icon : ''}</div>`
        }
    }
    squares = document.querySelectorAll(".square");
    currentPlayerSpan.innerHTML = game.currentPlayer
}

setBoard()

// A function to highlight valid moves
function highlight(boxes) {
    squares.forEach(square => square.classList.remove('highlight'));
    boxes.forEach((box) => {
        squares[box.row * 8 + box.col].classList.add('highlight');
    })
}

// Assigning event listeners to all squares
function addListeners() {
    // console.log("called")
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            squares[i * 8 + j].addEventListener("click", () => selectSquare(i, j));
        }
    }
}

addListeners();

// 
async function selectSquare(row, col) {
    let square = squares[row * 8 + col]
    if (square.classList.contains("highlight")) {
        makeMove(game, row, col);

        setBoard();



        if (isCheckmate(game)) {
            alert(game.currentPlayer === "white" ? "black" : "white" + " won!")
            window.location.reload()
        }

        if (isStalemate(game)) {
            alert(game.currentPlayer + " has nothing to play. Match tied!")
            window.location.reload()
        }

        addListeners()
    }
    else if (game.board.board[row][col]) {
        if (game.currentPlayer == game.board.board[row][col].color) {
            var boxes = getValidMoves(game, game.board.board[row][col]);
            highlight(boxes);
            game.selectedSquare = { row: row, col: col }
        }
        else {
            alert("Not your piece")
        }
    }
}







