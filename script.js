const gameBoard = {
    topRow: ['', '', ''],
    midRow: ['', '', ''],
    botRow: ['', '', '']
};

const ticTacToe = (function () {
    // declare player 1 and player 2: name and sign
    const player1 = {
        name: '',
        weapon: 'o',
        score: 0
    }

    const player2 = {
        name: '',
        weapon: 'x',
        score: 0
    }

    const tiePlay = {
        score: 0
    }

    const winner = {
        name: null,
    }
    // make player 1 move first 
    // After a player move, then switch active player 
    let activePlayer = null;
    function lookForPlayer() {
        if (!activePlayer) {
            activePlayer = player1;
        } else {
            activePlayer = activePlayer === player1 ? player2 : player1;
        }

        if (activePlayer.weapon == 'x') {
            turnText.textContent = `player o turn!`;
        } else {
            turnText.textContent = `player x turn!`;
        }
    }

    // make mechanic for player to put its sign in the gameboard
    const playTurn = function (row, index) {
        lookForPlayer();
        if (gameBoard[row][index] === '') {
            gameBoard[row][index] = activePlayer.weapon;
        } else {
            console.log('choose another location please');
            lookForPlayer();
        }
        referee();
    } 

    // Check all winning possibilities and ties AND announce the result
    const referee = function () {
        if (gameBoard.topRow[0] === 'o' && gameBoard.topRow[1] === 'o' && gameBoard.topRow[2] === 'o' ||
            gameBoard.midRow[0] === 'o' && gameBoard.midRow[1] === 'o' && gameBoard.midRow[2] === 'o' ||
            gameBoard.botRow[0] === 'o' && gameBoard.botRow[1] === 'o' && gameBoard.botRow[2] === 'o'||
            gameBoard.topRow[0] === 'o' && gameBoard.midRow[0] === 'o' && gameBoard.botRow[0] === 'o'||
            gameBoard.topRow[1] === 'o' && gameBoard.midRow[1] === 'o' && gameBoard.botRow[1] === 'o'||
            gameBoard.topRow[2] === 'o' && gameBoard.midRow[2] === 'o' && gameBoard.botRow[2] === 'o'||
            gameBoard.topRow[0] === 'o' && gameBoard.midRow[1] === 'o' && gameBoard.botRow[2] === 'o'||
            gameBoard.topRow[2] === 'o' && gameBoard.midRow[1] === 'o' && gameBoard.botRow[0] === 'o') {
            
            turnText.textContent = `player o, you're winning son!`;
            title.textContent = `winner is Player o`;
            player1.score++;
            player1Score.textContent = player1.score;
            winner.name = 'Player O';
            activePlayer = null;
        } else if (gameBoard.topRow[0] === 'x' && gameBoard.topRow[1] === 'x' && gameBoard.topRow[2] === 'x' ||
            gameBoard.midRow[0] === 'x' && gameBoard.midRow[1] === 'x' && gameBoard.midRow[2] === 'x' ||
            gameBoard.botRow[0] === 'x' && gameBoard.botRow[1] === 'x' && gameBoard.botRow[2] === 'x'||
            gameBoard.topRow[0] === 'x' && gameBoard.midRow[0] === 'x' && gameBoard.botRow[0] === 'x'||
            gameBoard.topRow[1] === 'x' && gameBoard.midRow[1] === 'x' && gameBoard.botRow[1] === 'x'||
            gameBoard.topRow[2] === 'x' && gameBoard.midRow[2] === 'x' && gameBoard.botRow[2] === 'x'||
            gameBoard.topRow[0] === 'x' && gameBoard.midRow[1] === 'x' && gameBoard.botRow[2] === 'x'||
            gameBoard.topRow[2] === 'x' && gameBoard.midRow[1] === 'x' && gameBoard.botRow[0] === 'x') {
            
            turnText.textContent = `player x, you're winning son!`;
            title.textContent = `winner is Player x`;
            player2.score++;
            player2Score.textContent = player2.score;
            winner.name = 'Player X';
            activePlayer = null;
        } else if (gameBoard.topRow[0] !== '' && gameBoard.topRow[1] !== '' && gameBoard.topRow[2] !== ''
            && gameBoard.midRow[0] !== '' && gameBoard.midRow[1] !== '' && gameBoard.midRow[2] !== ''
            && gameBoard.botRow[0] !== '' && gameBoard.botRow[1] !== '' && gameBoard.botRow[2] !== '') {
            turnText.textContent = `damn, it's a tie!`;
            title.textContent = `ties`;
            tiePlay.score++
            tieScore.textContent = tiePlay.score;
            winner.name = 'No Winner';
            activePlayer = null;
        }
    };

    return {player1, player2, playTurn, activePlayer, winner}
})();

// Create element to display game
    const container = document.querySelector('.container');
    const topLeft = document.createElement('div');
    const topCentral = document.createElement('div');
    const topRight = document.createElement('div');
    const midLeft = document.createElement('div');
    const midCentral = document.createElement('div');
    const midRight = document.createElement('div');
    const botLeft = document.createElement('div');
    const botCentral = document.createElement('div');
    const botRight = document.createElement('div');
    const turnText = document.querySelector('.turn');
    const title = document.querySelector('h1');
    const player1Score = document.querySelector('.score1');
    const player2Score = document.querySelector('.score2');
    const tieScore = document.querySelector('.tie');
    const nextRound = document.querySelector('.nextRound');
    const restart = document.querySelector('.restart');

    topLeft.classList.add('gameboard', 'topLeft');
    topCentral.classList.add('gameboard', 'topCentral');
    topRight.classList.add('gameboard', 'topRight');
    midLeft.classList.add('gameboard', 'midLeft');
    midCentral.classList.add('gameboard', 'midCentral');
    midRight.classList.add('gameboard', 'midRight');
    botLeft.classList.add('gameboard', 'botLeft');
    botCentral.classList.add('gameboard', 'botCentral');
    botRight.classList.add('gameboard', 'botRight');

    container.append(topLeft, topCentral, topRight, midLeft, midCentral, midRight, botLeft, botCentral, botRight);

const playGame = (function () { 
    const gameBoardDom = document.querySelectorAll('.gameboard');
    for (const board of gameBoardDom) {
        board.addEventListener('click', event => {
            if (ticTacToe.winner.name !== null) {
            return;
        }
            if (event.target.classList.contains('topLeft')) {
                ticTacToe.playTurn('topRow', 0);
                event.target.textContent = gameBoard.topRow[0];
                event.target.classList.add(gameBoard.topRow[0]);
            } else if (event.target.classList.contains('topCentral')) {
                ticTacToe.playTurn('topRow', 1);
                event.target.textContent = gameBoard.topRow[1];
                event.target.classList.add(gameBoard.topRow[1]);
            } else if (event.target.classList.contains('topRight')) {
                ticTacToe.playTurn('topRow', 2);
                event.target.textContent = gameBoard.topRow[2];
                event.target.classList.add(gameBoard.topRow[2]);
            } else if (event.target.classList.contains('midLeft')) {
                ticTacToe.playTurn('midRow', 0);
                event.target.textContent = gameBoard.midRow[0];
                event.target.classList.add(gameBoard.midRow[0]);
            } else if (event.target.classList.contains('midCentral')) {
                ticTacToe.playTurn('midRow', 1);
                event.target.textContent = gameBoard.midRow[1];
                event.target.classList.add(gameBoard.midRow[1]);
            } else if (event.target.classList.contains('midRight')) {
                ticTacToe.playTurn('midRow', 2);
                event.target.textContent = gameBoard.midRow[2];
                event.target.classList.add(gameBoard.midRow[2]);
            } else if (event.target.classList.contains('botLeft')) {
                ticTacToe.playTurn('botRow', 0);
                event.target.textContent = gameBoard.botRow[0];
                event.target.classList.add(gameBoard.botRow[0]);
            } else if (event.target.classList.contains('botCentral')) {
                ticTacToe.playTurn('botRow', 1);
                event.target.textContent = gameBoard.botRow[1];
                event.target.classList.add(gameBoard.botRow[1]);
            } else if (event.target.classList.contains('botRight')) {
                ticTacToe.playTurn('botRow', 2);
                event.target.textContent = gameBoard.botRow[2];
                event.target.classList.add(gameBoard.botRow[2]);
            }
        }
    )
    }

    nextRound.addEventListener('click', () => {
        if (ticTacToe.winner.name === null) {
            return;
        }
        ticTacToe.winner.name = null;

        Object.keys(gameBoard).forEach(row => {
        gameBoard[row].fill('');});

        const boardDiv = document.querySelectorAll('.gameboard');
        for (const board of boardDiv) {
            board.textContent = '';
            board.classList.remove('x', 'o')
        }

        turnText.textContent = `Let' Play Again, Player o Go First!`
        title.textContent = `Tic Tac Toe`
    })

    restart.addEventListener('click', () => {
        if (ticTacToe.winner.name !== null) {
            return;
        } 

        Object.keys(gameBoard).forEach(row => {
        gameBoard[row].fill('');});

        const boardDiv = document.querySelectorAll('.gameboard');
        for (const board of boardDiv) {
            board.textContent = '';
            board.classList.remove('x', 'o')
        }

        turnText.textContent = `restarted, Player o Go First again!`
        title.textContent = `Tic Tac Toe`
    })
}
)();