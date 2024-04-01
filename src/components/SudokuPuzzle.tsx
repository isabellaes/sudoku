import { useState } from "react";
import { Cell, Row } from "../functions";
import "./sudokuPuzzle.css";

type Props = { puzzle: Row[] };
const SudokuPuzzle = ({ puzzle }: Props) => {
  const [selected, setSelected] = useState({} as Cell);
  const [selectedDiv, setSelectedDiv] = useState({} as HTMLDivElement);
  const btns: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function handleOnClick(d: HTMLDivElement, c: Cell) {
    if (!c.visible) {
      setSelected(c);
      setSelectedDiv(d);
      d.style.backgroundColor = "lightblue";
    }
  }

  function handleAddNumber(x: string) {
    if (selectedDiv.innerHTML === "" || !selected.visible) {
      const id = selectedDiv.id.split(" ");

      if (puzzle[Number(id[0])].cells[Number(id[1])].value === Number(x)) {
        selectedDiv.innerHTML = x;
        selectedDiv.style.backgroundColor = "green";
      } else {
        selectedDiv.innerHTML = x;
        selectedDiv.style.backgroundColor = "red";
      }
    }
  }

  function handleReverse() {
    selectedDiv.innerHTML = "";
    selectedDiv.style.backgroundColor = "burlywood";
  }

  return (
    <>
      <div className="container-grid">
        {puzzle.map((r, rowIndex) =>
          r.cells.map((c, colIndex) => {
            if (
              (colIndex + 1 === 3 || colIndex + 1 === 6) &&
              (rowIndex + 1 === 3 || rowIndex + 1 === 6)
            )
              return (
                <div
                  id={r.id.toString() + " " + c.colNum.toString()}
                  className="cell border-bottom border-right"
                >
                  {c.visible === false ? "" : c.value}
                </div>
              );
            else if (rowIndex + 1 === 3 || rowIndex + 1 === 6) {
              return (
                <div
                  id={rowIndex.toString() + " " + colIndex.toString()}
                  className="cell border-bottom"
                  key={colIndex}
                  onClick={(e) => handleOnClick(e.currentTarget, c)}
                >
                  {c.visible === false ? "" : c.value}
                </div>
              );
            } else if (colIndex + 1 === 3 || colIndex + 1 === 6) {
              return (
                <div
                  id={rowIndex.toString() + " " + colIndex.toString()}
                  className="cell border-right"
                  key={colIndex}
                  onClick={(e) => handleOnClick(e.currentTarget, c)}
                >
                  {c.visible === false ? "" : c.value}
                </div>
              );
            }
            return (
              <div
                id={rowIndex.toString() + " " + colIndex.toString()}
                className="cell"
                key={colIndex}
                onClick={(e) => handleOnClick(e.currentTarget, c)}
              >
                {c.visible === false ? "" : c.value}
              </div>
            );
          })
        )}
      </div>
      <div className="btns">
        {btns.map((b) => (
          <button onClick={() => handleAddNumber(b)}>{b}</button>
        ))}

        <button onClick={handleReverse}>ÅNGRA</button>
      </div>
    </>
  );
};

export default SudokuPuzzle;

/* 
   {puzzle.map((r, rowIndex) =>
          r.cells.map((c, colIndex) => (
            <div id={r.id.toString() + c.colNum.toString()} className="cell">
              {c.visible === false ? "" : c.value}
            </div>
          ))
        )}
        {/* 
*/
