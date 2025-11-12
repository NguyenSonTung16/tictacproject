import React, { useState } from "react";
import Board from "./Board";
import "../App.css"; 

// Hàm tính người thắng 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6], 
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const [ascending, setAscending] = useState(true);


  const current = history[stepNumber];
  const { winner, line } = calculateWinner(current.squares);


  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    setHistory(
      newHistory.concat([
        { squares: squares, location: `(${row}, ${col})` },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

 
  const handleNewGame = () => {
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setStepNumber(0);
    setXIsNext(true);
  };


  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} ${step.location || ""}`
      : "Go to game start";
    return (
      <li key={move}>
        {move === stepNumber ? (
          <div className="current-move">You are at move #{move}</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  const sortedMoves = ascending ? moves : [...moves].reverse();

 
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game-container">
      <main className="game-body">
        
        <div className="scoreboard status-board">
          {/* Hiển thị 'status' (lượt đi, thắng, hòa) */}
          {status}
        </div>

        <Board
          squares={current.squares}
          onClick={handleClick}
          winningLine={line}
        />

        {/* Bảng Lịch sử */}
        <div className="scoreboard history-board">
          <button className="sort-btn" onClick={() => setAscending(!ascending)}>
            Sort {ascending ? "Descending" : "Ascending"}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <button className="new-game-btn" onClick={handleNewGame}>
          New Game
        </button>
      </footer>

    </div>
  );
}