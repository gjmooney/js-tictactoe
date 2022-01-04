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
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
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
        displayController.drawBoard();
    };

    return { setCell, getCell, resetBoard };
})();

const displayController = (() => {
    const _cells = document.querySelectorAll('.game-cell');
    const _overlay = document.getElementById('overlay');
    const _winnerMessage = document.getElementById('winner-message');
    const _messageText = document.getElementById('message-text');

    _cells.forEach((cell) =>
        cell.addEventListener('click', (e) => {
            gameLogic.doTurn(e.target.dataset.index);
            drawBoard();
        })
    );

    _overlay.addEventListener('click', (e) => {
        _overlay.style.display = 'none';
        _winnerMessage.style.display = 'none';
    })

    const drawBoard = () => {
        for (let i = 0; i < _cells.length; i++) {
            _cells[i].textContent = gameBoard.getCell(i);
        }
    };

    const gameOver = (winner) => {
        _overlay.style.display = 'block';
        _winnerMessage.style.display = 'flex';
        _displayWinnerMessage(winner);
    }

    const _displayWinnerMessage = (winner) => {
        if (winner === 'tie') {
            _messageText.innerText = 'It was a draw!';
        } else {
            _messageText.innerText = `Game over! Player ${winner} has won!`;
        }
    }

    const resetGame = () => {
        _overlay.style.display = 'none';
        _winnerMessage.style.display = 'none';
    }


   return {drawBoard, gameOver, resetGame};


})();

const gameLogic = (() => {
    let _turn = 1;
    let _player;
    let _moveOn = false;
    const _firstPlayer = Player('x');
    const _secondPlayer = Player('o');
    const _reset = document.querySelectorAll('.restart-button');

    const init = () => {
        console.log('init')
        displayController.drawBoard();
        _reset.forEach(button => {
            button.addEventListener('click', resetGame)
        })
    }

    const doTurn = (index) => {
        if (_turn % 2 !== 0) {
            //player x
            _player = _firstPlayer;
        } else {
            //player o
            _player = _secondPlayer
        }

        do {
            if (gameBoard.getCell(index) === ' ') {
                gameBoard.setCell(index, _player.getPiece());
                _moveOn = true;
                _turn++;
            }
        } while (!_moveOn)

        if (_checkWin(_player.getPiece(), index)) {
            displayController.gameOver(_player.getPiece());
        }

        if (_turn === 10) {
            displayController.gameOver('tie');
        }
    };

    const _checkWin = (playerPiece, cellIndex) => {
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

    const resetGame = () => {
        _turn = 1;
        gameBoard.resetBoard();
        displayController.resetGame();
    };


    const getTurn = () => {
        return _turn;
    };

    return {doTurn, getTurn, init};
})();

gameLogic.init();


