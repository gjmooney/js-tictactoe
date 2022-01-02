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

    const doTurn = (index) => {
        if (_turn % 2 !== 0) {
            //player x
            gameBoard.setCell(index, firstPlayer.getPiece());
        } else {
            //player o
            gameBoard.setCell(index, secondPlayer.getPiece());
        }

        _turn++;
    }

    const getTurn = () => {
        return _turn;
    }

    return {doTurn, getTurn};
})();



