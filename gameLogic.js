export function createBoard(size, mines) {
      const board = [];
      for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
          board[i][j] = { mine: false, revealed: false, adjacentMines: 0 };
        }
      }

      let minesPlaced = 0;
      while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (!board[row][col].mine) {
          board[row][col].mine = true;
          minesPlaced++;
        }
      }

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (!board[i][j].mine) {
            board[i][j].adjacentMines = countAdjacentMines(board, i, j);
          }
        }
      }

      return board;
    }

    function countAdjacentMines(board, row, col) {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
            if (board[newRow][newCol].mine) {
              count++;
            }
          }
        }
      }
      return count;
    }

    export function revealCell(board, row, col) {
      if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col].revealed) {
        return;
      }
      board[row][col].revealed = true;
      if (board[row][col].adjacentMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            revealCell(board, row + i, col + j);
          }
        }
      }
    }

    export function checkWin(board) {
      for (let row of board) {
        for (let cell of row) {
          if (!cell.mine && !cell.revealed) {
            return false;
          }
        }
      }
      return true;
    }
