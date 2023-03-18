import "./App.css";
import { useState, useRef } from "react";
/**
 * Create tic-tac-toe. Add functionality to show the current player.
 * When a winner is set, disable all the
 * board squares and show a "New Game" button.
 * When the button is clicked reset the board.
 */

function Square({ value, clickHandler }:{ value:string, clickHandler:string }) {
  return (
    <button className="square" onClick={clickHandler}>
      {value}
    </button>
  );
}
export default function App() {
  const [ifXisNext, setIftscXisNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const buttons = document.getElementsByClassName("square");
  const newGameRef = useRef(null);

  function clickHandler(i) {
    if (squares[i]) return;
    const newSquares = [...squares];
    newSquares[i] = ifXisNext ? "X" : "O";
    setSquares(newSquares);
    setIfXisNext(!ifXisNext);
  }

  function newGameBtnHandler() {
    newGameRef.current.style.display = "none";
    const newSquares = Array(9).fill(null);
    for (const button of buttons) {
      button.disabled = false;
    }
    setSquares(newSquares);
    setIfXisNext(true);
  }
  const rows = squares.map((square, i) => {
    return (
      <Square
        key={i}
        value={square}
        clickHandler={() => {
          clickHandler(i);
        }}
      />
    );
  });

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner is :" + winner
    : "Next Player:" + (ifXisNext ? "X" : "O");

  if (winner) {
    newGameRef.current.style.display = "block";

    for (const button of buttons) {
      button.disabled = true;
    }
  }
  return (
    <>
      {" "}
      <div>{status}</div>
      <div className="board">{rows}</div>
      <div>
        <button ref={newGameRef} id="new-game-btn" onClick={newGameBtnHandler}>
          New Game
        </button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
