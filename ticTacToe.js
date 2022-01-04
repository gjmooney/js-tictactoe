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
        //console.log('get cell ' + _board[index]);
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
    let _player;

    const doTurn = (index) => {
        if (_turn % 2 !== 0) {
            //player x
            _player = firstPlayer;
        } else {
            //player o
            _player = secondPlayer
        }

        gameBoard.setCell(index, _player.getPiece());

        if (checkWin(_player.getPiece(), index)) {
            gameOver(_player.getPiece());
        } else {
            _turn++;
        }
    };

    const checkWin = (playerPiece, cellIndex) => {
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
        return  winConditions
            .filter((possible) => possible.includes(+cellIndex))
            .some((possibleCombo) => possibleCombo.every((index) =>
                    gameBoard.getCell(index) === playerPiece))
    };

    const gameOver = (player) => {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('winner-message').style.display = 'flex';
        gameBoard.resetBoard();
    }

    const getTurn = () => {
        return _turn;
    };

    return {doTurn, getTurn, checkWin};
})();



