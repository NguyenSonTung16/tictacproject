import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const highlight = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={highlight}
      />
    );
  };

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      rowSquares.push(renderSquare(row * 3 + col));
    }
    boardRows.push(
      <div className="board-row" key={row}>
        {rowSquares}
      </div>
    );
  }

  // ✅ MỚI: Thêm div .board-container bọc ngoài
  return <div className="board-container">{boardRows}</div>;
}