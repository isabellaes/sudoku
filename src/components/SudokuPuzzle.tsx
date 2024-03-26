import { generateRandomSudokuPuzzle } from "../functions";
import "./sudokuPuzzle.css";

const SudokuPuzzle = () => {
  const puzzle = generateRandomSudokuPuzzle();
  console.log(puzzle);
  return (
    <div className="container-grid">
      {puzzle.map((p) => (
        <div className="box-grid">
          {p.map((n) => (
            <div className="cell">{n}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuPuzzle;
