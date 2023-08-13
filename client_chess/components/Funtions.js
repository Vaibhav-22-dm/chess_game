export const isValidRookMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  // Check if the move is horizontal or vertical
  if (fromRow === toRow || fromCol === toCol) {
    // Check if there are any pieces in the way
    if (fromRow === toRow) {
      const start = Math.min(fromCol, toCol) + 1;
      const end = Math.max(fromCol, toCol);

      for (let col = start; col < end; col++) {
        if (chessboard[fromRow][col] !== '') {
          return false;
        }
      }
    } else {
      const start = Math.min(fromRow, toRow) + 1;
      const end = Math.max(fromRow, toRow);

      for (let row = start; row < end; row++) {
        if (chessboard[row][fromCol] !== '') {
          return false;
        }
      }
    }

    return true;
  }

  return false;
};

export const isValidKnightMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  // Check if the move is L-shaped
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

export const isValidBishopMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  // Check if the move is diagonal
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff === colDiff && (rowDiff > 0 || colDiff > 0)) {
    // Check if there are any pieces in the way
    const rowDir = toRow > fromRow ? 1 : -1;
    const colDir = toCol > fromCol ? 1 : -1;
    let row = fromRow + rowDir;
    let col = fromCol + colDir;
    while (row !== toRow && col !== toCol) {
      if (chessboard[row][col] !== '') {
        return false;
      }

      row += rowDir;
      col += colDir;
    }

    return true;
  }

  return false;
};

export const isValidQueenMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  // Queen move is valid if it's a valid rook move or a valid bishop move
  return (
    isValidRookMove(fromRow, fromCol, toRow, toCol) ||
    isValidBishopMove(fromRow, fromCol, toRow, toCol)
  );
};

// Function to check if a king move is valid
export const isValidKingMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  // Check for castling
  const piece = chessboard[fromRow][fromCol];
  const color = whites.includes(piece) ? 'white' : 'black';

  if (color == 'white') {
    if (fromRow === 7 && fromRow == toRow && fromCol == 4 && toCol === 2) {
      if (isWhiteKingMoved === false && isWhiteRookLeftMoved === false) {
        for (var i = 1; i < 4; i++) {
          if (chessboard[fromRow][i] !== '') {
            return false;
          }
        }

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            if (
              chessboard[row][col] !== '' &&
              blacks.includes(chessboard[row][col])
            ) {
              if (
                isValidMove(row, col, 7, 4) ||
                isValidMove(row, col, 7, 3) ||
                isValidMove(row, col, 7, 2)
              ) {
                return false;
              }
            }
          }
        }

        return true;
      }
    } else if (
      fromRow === 7 &&
      fromRow == toRow &&
      fromCol == 4 &&
      toCol === 6
    ) {
      if (isWhiteKingMoved === false && isWhiteRookRightMoved === false) {
        for (var i = 5; i < 7; i++) {
          if (chessboard[fromRow][i] !== '') {
            return false;
          }
        }

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            if (
              chessboard[row][col] !== '' &&
              blacks.includes(chessboard[row][col])
            ) {
              if (
                isValidMove(row, col, 7, 4) ||
                isValidMove(row, col, 7, 5) ||
                isValidMove(row, col, 7, 6)
              ) {
                return false;
              }
            }
          }
        }

        return true;
      }
    }
  }

  if (color == 'black') {
    if (fromRow === 0 && fromRow == toRow && fromCol == 4 && toCol === 2) {
      if (isBlackKingMoved === false && isBlackRookLeftMoved === false) {
        for (var i = 1; i < 4; i++) {
          if (chessboard[fromRow][i] !== '') {
            return false;
          }
        }

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            if (
              chessboard[row][col] !== '' &&
              whites.includes(chessboard[row][col])
            ) {
              if (
                isValidMove(row, col, 0, 4) ||
                isValidMove(row, col, 0, 3) ||
                isValidMove(row, col, 0, 2)
              ) {
                return false;
              }
            }
          }
        }

        return true;
      }
    } else if (
      fromRow === 0 &&
      fromRow == toRow &&
      fromCol == 4 &&
      toCol === 6
    ) {
      if (isBlackKingMoved === false && isBlackRookRightMoved === false) {
        for (var i = 5; i < 7; i++) {
          if (chessboard[fromRow][i] !== '') {
            return false;
          }
        }

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            if (
              chessboard[row][col] !== '' &&
              whites.includes(chessboard[row][col])
            ) {
              if (
                isValidMove(row, col, 0, 4) ||
                isValidMove(row, col, 0, 5) ||
                isValidMove(row, col, 0, 6)
              ) {
                return false;
              }
            }
          }
        }

        return true;
      }
    }
  }

  // Check if the move is one square away horizontally, vertically, or diagonally
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return (
    (rowDiff === 1 && colDiff === 0) ||
    (rowDiff === 0 && colDiff === 1) ||
    (rowDiff === 1 && colDiff === 1)
  );
};

// Function to check if a pawn move is valid
export const isValidPawnMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  const piece = chessboard[fromRow][fromCol];
  const target = chessboard[toRow][toCol];

  const direction = whites.includes(piece) ? -1 : 1;

  // Check if it's a valid pawn move one square forward
  if (fromCol === toCol && toRow === fromRow + direction && target === '') {
    return true;
  }

  // Check if it's a valid pawn move two squares forward from the starting position
  if (
    ((direction === -1 && fromRow === 6) ||
      (direction === 1 && fromRow === 1)) &&
    fromCol === toCol &&
    toRow === fromRow + 2 * direction &&
    target === '' &&
    chessboard[fromRow + direction][fromCol] === ''
  ) {
    return true;
  }

  // Check if it's an En passant
  if (lastMove !== null) {
    if (
      (lastMove.piece === '♙' &&
        lastMove.fromRow === 6 &&
        lastMove.toRow === 4 &&
        Math.abs(lastMove.toCol - fromCol) === 1 &&
        fromRow === 4 &&
        lastMove.toCol === toCol &&
        toRow === 5 &&
        chessboard[toRow][toCol] === '') ||
      (lastMove.piece === '♟' &&
        lastMove.fromRow === 1 &&
        lastMove.toRow === 3 &&
        Math.abs(lastMove.toCol - fromCol) === 1 &&
        fromRow === 3 &&
        lastMove.toCol === toCol &&
        toRow === 2 &&
        chessboard[toRow][toCol] === '')
    ) {
      return true;
    }
  }

  // Check if it's a valid pawn capture move
  if (
    Math.abs(toCol - fromCol) === 1 &&
    toRow === fromRow + direction &&
    target !== ''
  ) {
    return true;
  }

  return false;
};

// Function to copy and return the same board
function getBoard(oldboard) {
  let board = [];
  for (var i = 0; i < 8; i++) {
    let temp = [];
    for (var j = 0; j < 8; j++) {
      temp.push(oldboard[i][j]);
    }
    board.push(temp);
  }
  return board;
}

// Function to check if the move is legal
function isIllegalMove(fromRow, fromCol, toRow, toCol, chessboard, lastMove) {
  let oldboard = getBoard(chessboard);

  let fromColor = whites.includes(chessboard[fromRow][fromCol])
    ? 'white'
    : 'black';

  if (chessboard[fromRow][fromCol] === '♔') {
    if (fromRow === 7 && fromRow == toRow && fromCol == 4 && toCol === 2) {
      chessboard[7][4] = '';
      chessboard[7][2] = '♔';
      chessboard[7][0] = '';
      chessboard[7][3] = '♖';
    } else if (
      fromRow === 7 &&
      fromRow == toRow &&
      fromCol == 4 &&
      toCol === 6
    ) {
      chessboard[7][4] = '';
      chessboard[7][6] = '♔';
      chessboard[7][7] = '';
      chessboard[7][5] = '♖';
    } else {
      chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
      chessboard[fromRow][fromCol] = '';
    }
  } else if (chessboard[fromRow][fromCol] === '♚') {
    if (fromRow === 0 && fromRow == toRow && fromCol == 4 && toCol === 2) {
      chessboard[0][4] = '';
      chessboard[0][2] = '♚';
      chessboard[0][0] = '';
      chessboard[0][3] = '♜';
    } else if (
      fromRow === 0 &&
      fromRow == toRow &&
      fromCol == 4 &&
      toCol === 6
    ) {
      chessboard[0][4] = '';
      chessboard[0][6] = '♚';
      chessboard[0][7] = '';
      chessboard[0][5] = '♜';
    } else {
      chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
      chessboard[fromRow][fromCol] = '';
    }
  } else if (
    (chessboard[fromRow][fromCol] === '♙' ||
      chessboard[fromRow][fromCol] === '♟') &&
    Math.abs(fromRow - toRow) === 1 &&
    Math.abs(fromCol - toCol) === 1 &&
    chessboard[toRow][toCol] === ''
  ) {
    chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
    chessboard[fromRow][fromCol] = '';
    chessboard[lastMove.toRow][lastMove.toCol] = '';
  } else {
    chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
    chessboard[fromRow][fromCol] = '';
  }

  let kingPosition = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        (fromColor === 'black' && chessboard[row][col] === '♚') ||
        (fromColor === 'white' && chessboard[row][col] === '♔')
      ) {
        kingPosition = {
          row: row,
          col: col,
        };
      }
    }
  }

  if (kingPosition === null) return false;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (
        chessboard[kingPosition.row][kingPosition.col] === '' ||
        chessboard[i][j] === ''
      )
        continue;

      // Piece can't be moved to its own place
      if (i == kingPosition.row && j == kingPosition.col) continue;

      // User can't move a piece to a place where it's own piece is present
      if ((whites.includes(chessboard[i][j]) ? 'white' : 'black') === fromColor)
        continue;

      if (
        validityFunctions[chessboard[i][j]](
          i,
          j,
          kingPosition.row,
          kingPosition.col,
        )
      ) {
        chessboard = getBoard(oldboard);
        return true;
      }
    }
  }
  chessboard = getBoard(oldboard);
  return false;
}

// Function to check if a move is valid
export const isValidMove = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  chessboard,
  lastMove,
) => {
  if (fromCol && fromRow && toRow && toCol && chessboard) {
    const piece = chessboard[fromRow][fromCol];
    const target = chessboard[toRow][toCol];
    const fromColor = whites.includes(piece) ? 'white' : 'black';
    const toColor = whites.includes(target) ? 'white' : 'black';

    // Piece can't move to its own location
    if (fromRow == toRow && fromCol == toCol) return false;

    // User can't move a piece to a place where it's own piece is present
    if (target !== '') {
      if (fromColor === toColor) {
        return false;
      }
    }

    let isValid = validityFunctions[piece](
      fromRow,
      fromCol,
      toRow,
      toCol,
      chessboard,
      lastMove,
    );

    console.log(chessboard);

    if (isValid === true) {
      isValid =
        isValid &&
        !isIllegalMove(fromRow, fromCol, toRow, toCol, chessboard, lastMove);
    }

    return isValid;
  }
  return false;
};

export const whites = ['♖', '♘', '♗', '♕', '♔', '♙'];
export const blacks = ['♜', '♞', '♝', '♛', '♚', '♟'];
export const validityFunctions = {
  '♖': isValidRookMove,
  '♜': isValidRookMove,
  '♘': isValidKnightMove,
  '♞': isValidKnightMove,
  '♗': isValidBishopMove,
  '♝': isValidBishopMove,
  '♕': isValidQueenMove,
  '♛': isValidQueenMove,
  '♔': isValidKingMove,
  '♚': isValidKingMove,
  '♙': isValidPawnMove,
  '♟': isValidPawnMove,
};

// Function to highlight squares where a piece can go
export const highlightValidMoves = async (piece, row, col) => {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      const validity = await isValidMove(row, col, i, j);
      if (validity) {
        const square = document.querySelector(
          `.square[data-row="${i}"][data-col="${j}"]`,
        );
        square.classList.add('highlight');
      }
    }
  }
};
