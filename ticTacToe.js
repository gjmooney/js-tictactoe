"use strict";
const Player = (piece) => {
    // human is x, computer is o
    this.piece = piece;

    const getPiece = () => {
        return piece;
    }

    return {getPiece};
};

const gameBoard = (() => {
    const _board = [
        'd', 'd', 'd',
        'd', 'd', 'd',
        'd', 'd', 'd'
    ];

    const setCell = (index, playerPiece) => {
        _board[index] = playerPiece;
    };

    const getCell = (index) => {
        return _board[index];
    };

    const resetBoard = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = ' ';
        }
    };

    return { setCell, getCell, resetBoard };
})();

const displayController = (() => {
    const _cells = document.querySelectorAll('.game-cell');

    _cells.forEach((cell) =>
        cell.addEventListener('click', (e) => {
            gameLogic.doTurn(e.target.dataset.index);
            drawBoard();
        })
    );

    const drawBoard = () => {
        for (let i = 0; i < _cells.length; i++) {
            _cells[i].textContent = gameBoard.getCell(i);
        }
    };

   return {drawBoard};


})();

const gameLogic = (() => {
    displayController.drawBoard();
    let _turn = 1;
    const firstPlayer = Player('x');
    const secondPlayer = Player('o');
    let _player = 'x';

    const doTurn = (index) => {
        if (_turn % 2 !== 0) {
            //player x
            gameBoard.setCell(index, firstPlayer.getPiece());
        } else {
            //player o
            gameBoard.setCell(index, secondPlayer.getPiece());
        }
        if (checkWin())
        _turn++;
    }

   

    const checkWin = (player, cellIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions.filter((combination) => combination.includes(cellIndex))
            .some((possibleCombination) =>
              possibleCombination.every(
                  (index) => gameBoard.getCell(index) === player
              )
            );
    }

    const getTurn = () => {
        return _turn;
    }

    return {doTurn, getTurn};
})();



