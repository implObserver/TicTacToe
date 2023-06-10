const GameBoard = (() => {
    const fillGameBoard = (witdh, height) => {
        let gameBoard = [];
        for (let i = 0; i < witdh; i++) {
            let line = []
            for (let j = 0; j < height; j++) {
                line[j] = 0;
            }
            gameBoard[i] = line;
        }
        return gameBoard;
    }

    let gameBoard = fillGameBoard(3, 3);

    const getGameBoard = () => {
        return gameBoard;
    }

    const resetGameBoard = () => {
        gameBoard = fillGameBoard(3, 3);
    }

    const setGameBoardVal = (x, y, val) => {
        gameBoard[y][x] = val;
    }

    return { getGameBoard, resetGameBoard, setGameBoardVal }
})();