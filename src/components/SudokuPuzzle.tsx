import { generateRandomSudokuPuzzle } from "../functions";
import "./sudokuPuzzle.css";

const SudokuPuzzle = () => {
  const puzzle = generateRandomSudokuPuzzle();

  return (
    <div className="container-grid">
      {puzzle.map((row, rowIndex) =>
        row.map((n, colIndex) => {
          if (
            (colIndex + 1 === 3 || colIndex + 1 === 6) &&
            (rowIndex + 1 === 3 || rowIndex + 1 === 6)
          ) {
            return (
              <div className="cell border-right border-bottom" key={colIndex}>
                {n}
              </div>
            );
          } else if (rowIndex + 1 === 3 || rowIndex + 1 === 6) {
            return (
              <div className="cell border-bottom" key={colIndex}>
                {n}
              </div>
            );
          } else if (colIndex + 1 === 3 || colIndex + 1 === 6) {
            return (
              <div className="cell border-right" key={colIndex}>
                {n}
              </div>
            );
          }
          return (
            <div className="cell" key={colIndex}>
              {n}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuPuzzle;
