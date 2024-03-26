import { generateRandomSudokuPuzzle } from "../functions";
import "./sudokuPuzzle.css";

const SudokuPuzzle = () => {
  const puzzle = generateRandomSudokuPuzzle();

  return (
    <div className="container-grid">
      {puzzle.map((p, index) => (
        <div className="box-grid" key={index}>
          {p.map((n, index) => (
            <div className="cell" key={index}>
              {n}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuPuzzle;
