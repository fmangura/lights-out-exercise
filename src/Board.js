import React, { useLayoutEffect, useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function Board({ nrows, ncols, chanceLightStartsOn=0.5 }) {
  function litRandom() {
    return (Math.random() <= chanceLightStartsOn) ? true : false
  }

  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false valuesL
    for (let i=0; i < nrows; i++) {
      let col =[];

      for (let i=0; i < ncols; i++) {
        col.push(litRandom());
      };

      initialBoard.push(col);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (const rows in board) {
      for (const col in board[rows]) {
        if (board[rows][col] === false) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          return boardCopy[y][x];
        }
        return;
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = oldBoard.map(rows => [...rows]);
      // TODO: in the copy, flip this cell and the cells around it

      return copy.map((row, yidx) => {
        if (yidx === y) {
          return row.map((col, xidx) => {
            if (xidx === x || xidx === x-1 || xidx === x+1) {
              return flipCell(yidx, xidx, copy);
            } else {
              return col;
            }
          })

        } else if (yidx === y-1 || yidx === y+1) {
          return row.map((col, xidx) => {
            if (xidx === x) {
              return flipCell(yidx, xidx, copy);
            } else {
              return col;
            }
          })

        } else {
          return row;
        }
      })
      // TODO: return the copy
      // console.log(`The new board: ${copy}`)
      // return copy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <p>Winner!</p>
  }
  // TODO
  // make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((rows, yidx) => {
          return (<tr>
            {rows.map((col, xidx) => {
              let coord = `${yidx}-${xidx}`;
              return <Cell flipCellsAroundMe={evt => flipCellsAround(coord)} isLit={board[yidx][xidx]}/>})}
          </tr>)
        })}
      </tbody> 
    </table>
  );

  // return (
  //   <div>
  //     { }
  //   </div>
  // )

  // TODO
}

export default Board;
