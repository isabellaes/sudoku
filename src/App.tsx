import "./App.css";
import SudokuPuzzle from "./components/SudokuPuzzle";
import { generateRandomSudokuPuzzle } from "./functions";

function App() {
  const puzzle = generateRandomSudokuPuzzle();
  return (
    <>
      <h1>SUDOKU APP</h1>
      <SudokuPuzzle puzzle={puzzle} />
    </>
  );
}

export default App;
