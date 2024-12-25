import { createBoard, revealCell, checkWin } from './gameLogic.js';

    const boardSize = 10;
    const mineCount = 10;
    let board = createBoard(boardSize, mineCount);
    let gameOver = false;

    const gameContainer = document.getElementById('game-container');

    function renderBoard() {
      gameContainer.innerHTML = '';
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');
          if (cell.revealed) {
            cellElement.classList.add('revealed');
            if (cell.mine) {
              cellElement.classList.add('mine');
              cellElement.textContent = 'ðŸ’£';
            } else {
              cellElement.textContent = cell.adjacentMines || '';
            }
          }
          cellElement.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
          gameContainer.appendChild(cellElement);
        });
      });
    }

    function handleCellClick(row, col) {
      if (gameOver) return;
      revealCell(board, row, col);
      if (board[row][col].mine) {
        gameOver = true;
        alert('Game Over!');
      } else {
        if (checkWin(board)) {
          gameOver = true;
          alert('You Win!');
        }
      }
      renderBoard();
    }

    renderBoard();
