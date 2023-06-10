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

const Player = () => {
    let mark = 1;
    const setMark = (mrk) => {
        mark = mrk;
    }

    const getMark = () => {
        return mark;
    }

    return { getMark, setMark };
}

const MoveHundler = (() => {
    let playerMark;
    const gameBoard = GameBoard.getGameBoard();
    const lengthLine = 3;

    const checkWinnable = (x, y, mark) => {
        playerMark = mark;
        return checkHorizontal(x, y) === lengthLine ? true
            : checkVertical(x, y) === lengthLine ? true
                : checkLeftDiagonal(x, y) === lengthLine ? true
                    : checkRightDiagonal(x, y) === lengthLine ? true
                    :false;
    }

    const checkHorizontal = (x, y) => {
        let result = check([x, y, minE, minE, 0, decrement, neutral], [++x, y, maxE, minE, 0, increment, neutral]);
        return result;
    }

    const checkVertical = (x, y) => {
        let result = check([x, y, minE, minE, 0, neutral, decrement], [x, ++y, maxE, maxE, 0, neutral, increment]);
        return result;
    }

    const checkLeftDiagonal = (x, y) => {
        let result = check([x, y, minE, minE, 0, decrement, decrement], [++x, ++y, maxE, maxE, 0, increment, increment]);
        return result;
    }

    const checkRightDiagonal = (x, y) => {
        let result = check([x, y, maxE, minE, 0, increment, decrement], [--x, ++y, minE, maxE, 0, decrement, increment]);
        return result;
    }

    const check = (args1, args2) => {
        let part1 = measuringDeviceFabric(...args1);
        let part2 = measuringDeviceFabric(...args2);
        return part1 + part2;
    }

    const measuringDeviceFabric = (x, y, xBool, yBool, score = 0, functionX, functionY) => {
        if (xBool(x) && yBool(y)) {
            if (gameBoard[y][x] === playerMark) {
                ++score;
                return measuringDeviceFabric(functionX(x), functionY(y), xBool, yBool, score, functionX, functionY);
            }
        }
        return score;
    }

    const increment = (e) => {
        return ++e;
    }

    const decrement = (e) => {
        return --e;
    }

    const neutral = (e) => {
        return e;
    }

    const minE = (e) => {
        return e >= 0;
    }

    const maxE = (e) => {
        return e < gameBoard.length;
    }

    return { checkWinnable }

})();