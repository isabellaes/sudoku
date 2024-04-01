const GRIDNUM = 9;
const SQR_GRIDNUM = 3;

export type Row = {
  id: number;
  cells: Cell[];
};
export type Cell = {
  colNum: number;
  rowNum: number;
  boxNum: number;
  value: number;
  visible: boolean;
};

export function generateRandomSudokuPuzzle() {
  const rows: Row[] = [];
  for (let row = 0; row < GRIDNUM; row++) {
    rows.push({ id: row, cells: [] });
    for (let col = 0; col < GRIDNUM; col++) {
      const boxRow = Math.floor(row / SQR_GRIDNUM);
      const boxCol = Math.floor(col / SQR_GRIDNUM);
      const num = 3 * boxRow + boxCol;

      const cell: Cell = {
        colNum: col,
        rowNum: row,
        boxNum: num,
        value: 0,
        visible: true,
      };
      rows[row].cells.push(cell);
    }
  }

  fillDiagonal(rows);
  fillRemaining(0, SQR_GRIDNUM, rows);
  removeKDigits(rows);

  return rows;
}

function randomGenerator() {
  return Math.floor(Math.random() * GRIDNUM + 1);
}

function fillDiagonal(grid: Row[]) {
  for (let i = 0; i < GRIDNUM; i += SQR_GRIDNUM) {
    fillBox(i, i, grid);
  }
}

function fillBox(rowIndex: number, colIndex: number, grid: Row[]) {
  let num = 0;
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      while (true) {
        num = randomGenerator();
        if (checkIfUnusedInBox(rowIndex, colIndex, num, grid)) {
          break;
        }
      }
      grid[rowIndex + row].cells[colIndex + col].value = num;
    }
  }
}

function checkIfUnusedInBox(
  rowIndex: number,
  colIndex: number,
  num: number,
  grid: Row[]
) {
  for (let row = 0; row < SQR_GRIDNUM; row++) {
    for (let col = 0; col < SQR_GRIDNUM; col++) {
      if (grid[rowIndex + row].cells[colIndex + col].value === num) {
        return false;
      }
    }
  }
  return true;
}

function checkIfSafe(i: number, j: number, num: number, grid: Row[]) {
  return (
    checkIfunUsedInRow(i, num, grid) &&
    checkIfunUsedInCol(j, num, grid) &&
    checkIfUnusedInBox(i - (i % SQR_GRIDNUM), j - (j % SQR_GRIDNUM), num, grid)
  );
}

// check in the row for existence
function checkIfunUsedInRow(i: number, num: number, grid: Row[]) {
  for (let j = 0; j < GRIDNUM; j++) {
    if (grid[i].cells[j].value === num) {
      return false;
    }
  }
  return true;
}

// check in the row for existence
function checkIfunUsedInCol(j: number, num: number, grid: Row[]) {
  for (let i = 0; i < GRIDNUM; i++) {
    if (grid[i].cells[j].value === num) {
      return false;
    }
  }
  return true;
}

function fillRemaining(i: number, j: number, grid: Row[]) {
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
  if (grid[i].cells[j].value !== 0) {
    return fillRemaining(i, j + 1, grid);
  }

  // Try filling the current cell with a valid value
  for (let num = 1; num <= GRIDNUM; num++) {
    if (checkIfSafe(i, j, num, grid)) {
      grid[i].cells[j].value = num;
      if (fillRemaining(i, j + 1, grid)) {
        return true;
      }
      grid[i].cells[j].value = 0;
    }
  }

  // No valid value was found, so backtrack
  return false;
}

function removeKDigits(grid: Row[]) {
  let count = 30;

  while (count !== 0) {
    // extract coordinates i and j
    let i = Math.floor(Math.random() * GRIDNUM);
    let j = Math.floor(Math.random() * GRIDNUM);
    if (grid[i].cells[j].visible) {
      count--;
      grid[i].cells[j].visible = false;
    }
  }

  return;
}
