const GRIDNUM = 9;
const SQR_GRIDNUM = 3;
const puzzle: number[][] = [];

export function generateRandomSudokuPuzzle() {
  for (let index = 0; index < GRIDNUM; index++) {
    puzzle.push(new Array(GRIDNUM).fill(0));
  }
  fillDiagonal();
  fillRemaining();

  return puzzle;
}

function randomGenerator() {
  return Math.floor(Math.random() * GRIDNUM + 1);
}

function fillDiagonal() {
  for (let i = 0; i < GRIDNUM; i += SQR_GRIDNUM) {
    fillBox(i, i);
  }
}

function fillBox(rowIndex: number, colIndex: number) {
  let num = 0;
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      while (true) {
        num = randomGenerator();
        if (checkIfUnusedInBox(rowIndex, colIndex, num)) {
          break;
        }
      }
      puzzle[rowIndex + row][colIndex + col] = num;
    }
  }
}

function checkIfUnusedInBox(rowIndex: number, colIndex: number, num: number) {
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      if (puzzle[rowIndex + row][colIndex + col] === num) {
        return false;
      }
    }
  }
  return true;
}

function checkIfSafe(i: number, j: number, num: number) {
  return (
    checkIfunUsedInRow(i, num) &&
    checkIfunUsedInCol(j, num) &&
    checkIfUnusedInBox(i - (i % SQR_GRIDNUM), j - (j % SQR_GRIDNUM), num)
  );
}

// check in the row for existence
function checkIfunUsedInRow(i: number, num: number) {
  for (let j = 0; j < GRIDNUM; j++) {
    if (puzzle[i][j] === num) {
      return false;
    }
  }
  return true;
}

// check in the row for existence
function checkIfunUsedInCol(j: number, num: number) {
  for (let i = 0; i < GRIDNUM; i++) {
    if (puzzle[i][j] === num) {
      return false;
    }
  }
  return true;
}

function fillRemaining() {
  //fyll resten
}
