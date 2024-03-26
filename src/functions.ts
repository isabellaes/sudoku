const GRIDNUM = 9;
const SQR_GRIDNUM = 3;

export function generateRandomSudokuPuzzle() {
  const puzzle: number[][] = [];
  for (let index = 0; index < GRIDNUM; index++) {
    puzzle.push(new Array(GRIDNUM).fill(0));
  }
  fillDiagonal(puzzle);
  fillRemaining(0, SQR_GRIDNUM, puzzle);

  return puzzle;
}

function randomGenerator() {
  return Math.floor(Math.random() * GRIDNUM + 1);
}

function fillDiagonal(grid: number[][]) {
  for (let i = 0; i < GRIDNUM; i += SQR_GRIDNUM) {
    fillBox(i, i, grid);
  }
}

function fillBox(rowIndex: number, colIndex: number, grid: number[][]) {
  let num = 0;
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      while (true) {
        num = randomGenerator();
        if (checkIfUnusedInBox(rowIndex, colIndex, num, grid)) {
          break;
        }
      }
      grid[rowIndex + row][colIndex + col] = num;
    }
  }
}

function checkIfUnusedInBox(
  rowIndex: number,
  colIndex: number,
  num: number,
  grid: number[][]
) {
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      if (grid[rowIndex + row][colIndex + col] === num) {
        return false;
      }
    }
  }
  return true;
}

function checkIfSafe(i: number, j: number, num: number, grid: number[][]) {
  return (
    checkIfunUsedInRow(i, num, grid) &&
    checkIfunUsedInCol(j, num, grid) &&
    checkIfUnusedInBox(i - (i % SQR_GRIDNUM), j - (j % SQR_GRIDNUM), num, grid)
  );
}

// check in the row for existence
function checkIfunUsedInRow(i: number, num: number, grid: number[][]) {
  for (let j = 0; j < GRIDNUM; j++) {
    if (grid[i][j] === num) {
      return false;
    }
  }
  return true;
}

// check in the row for existence
function checkIfunUsedInCol(j: number, num: number, grid: number[][]) {
  for (let i = 0; i < GRIDNUM; i++) {
    if (grid[i][j] === num) {
      return false;
    }
  }
  return true;
}

function fillRemaining(i: number, j: number, grid: number[][]) {
  // Check if we have reached the end of the matrix
  if (i === GRIDNUM - 1 && j === GRIDNUM) {
    return true;
  }

  // Move to the next row if we have reached the end of the current row
  if (j === GRIDNUM) {
    i += 1;
    j = 0;
  }

  // Skip cells that are already filled
  if (grid[i][j] !== 0) {
    return fillRemaining(i, j + 1, grid);
  }

  // Try filling the current cell with a valid value
  for (let num = 1; num <= GRIDNUM; num++) {
    if (checkIfSafe(i, j, num, grid)) {
      grid[i][j] = num;
      if (fillRemaining(i, j + 1, grid)) {
        return true;
      }
      grid[i][j] = 0;
    }
  }

  // No valid value was found, so backtrack
  return false;
}
