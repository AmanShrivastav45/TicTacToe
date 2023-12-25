document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll('.block');
    const message = document.querySelector('.message');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    blocks.forEach((block, index) => {
        block.addEventListener('click', () => handleClick(index));
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinner(pattern);
                return gameBoard[a];
            }
        }
        return null;
    }

    function highlightWinner(pattern) {
        pattern.forEach(index => blocks[index].classList.add('winner'));
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function handleClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            const winner = checkWinner();
            const draw = checkDraw();

            if (winner) {
                endGame(`Player ${winner} wins!`);
            } else if (draw) {
                endGame("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage(`Player ${currentPlayer}'s turn`);
            }
        }
    }

    function endGame(messageText) {
        message.textContent = messageText;
        gameActive = false;
    }

    function updateMessage(text) {
        message.textContent = text;
    }

    function renderBoard() {
        blocks.forEach((block, index) => {
            block.textContent = gameBoard[index];
        });
    }
});
