import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {isValidMove} from './Funtions';

const Game = () => {
  const [clickedRow, setClickedRow] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [lastMove, setLastMove] = useState(null);

  const [chessboard, setChessboard] = useState([
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ]);

  const renderPiece = (piece, row, col) => {
    const isDarkSquare = (row + col) % 2 !== 0;
    const backgroundColor = isDarkSquare ? '#b58863' : '#f0d9b5';

    const isValid = isValidMove(
      clickedRow,
      clickedIndex,
      row,
      col,
      chessboard,
      lastMove,
    );
    const moveHandller = () => {
      setClickedRow(null);
      setClickedIndex(null);
      let arrBoard = [...chessboard];
      arrBoard[row][col] = piece;
      setChessboard(arrBoard);
      const move = {
        fromRow: clickedRow,
        fromCol: clickedIndex,
        toRow: row,
        toCol: col,
        piece,
      };
      setLastMove(move);
    };

    const opacity = isValid ? 0.7 : 1;

    const clickhandler = () => {
      if (piece) {
        setSelectedPiece(piece);
        setClickedRow(row);
        setClickedIndex(col);
        console.log('piece clicked: ', piece);
      } else if (clickedRow && clickedIndex && isValid) {
        moveHandller();
      } else {
        setClickedRow(null);
        setClickedIndex(null);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={`${row}-${col}`}
        onPress={clickhandler}
        style={[styles.chessSquare, {backgroundColor}, {opacity}]}>
        <Text style={styles.piece}>{piece}</Text>
      </TouchableOpacity>
    );
  };

  const renderRow = (row, rowIndex) => (
    <View key={rowIndex} style={styles.chessRow}>
      {row.map((piece, colIndex) => renderPiece(piece, rowIndex, colIndex))}
    </View>
  );

  return (
    <View style={GameStyles.FullContainer}>
      <Text style={GameStyles.heading}>Game</Text>
      <View>{chessboard.map((row, r) => renderRow(row, r))}</View>
    </View>
  );
};

const GameStyles = StyleSheet.create({
  FullContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  heading: {
    fontFamily: 'monospace',
    marginVertical: 10,
    fontSize: 30,
    fontWeight: '900',
  },
});

const styles = StyleSheet.create({
  chessboard: {
    flexDirection: 'column',
  },
  chessRow: {
    flexDirection: 'row',
  },
  chessSquare: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
});

export default Game;
