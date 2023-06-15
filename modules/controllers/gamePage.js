import { GamePage } from "../selectors/gamePage.js";
import { DynamicDomElements } from "../dom/gamePage.js";
import { Tools } from "../tools.js";
import { GameBoard as board } from "../animations/gamePage.js";

const fillGameBoard = (height, width) => {
    console.log(GamePage.Body.heightRange.value)
    GamePage.Body.gameBoard.style.gridTemplateColumns = `repeat(${height},${60 / Math.max(width, height)}vh)`;
    GamePage.Body.gameBoard.style.gridTemplateRows = `repeat(${width},${60 / Math.max(width, height)}vh)`;
    for (let i = 0; i < width; i++) {
        let line = [];
        for (let j = 0; j < height; j++) {
            let cell = DynamicDomElements.cell();
            line[j] = cell;
            //board.cell.opacity(cell, 0.3, 0.7, 200, 'none');
            GamePage.Body.gameBoard.appendChild(cell);
        }

        GamePage.GameBoard.Cells[i] = line;
    }
    return { fillGameBoard };
};

const GameBoard = (() => {
    let width;
    let height;
    let cells;

    const setWidth = (number) => {
        width = number;
    }

    const setHeigth = (number) => {
        height = number;
    }

    const setCells = (number) => {
        cells = number
    }

    const getWidth = (number) => {
        return width;
    }

    const getHeigth = (number) => {
        return height;
    }

    const getCells = (number) => {
        return cells;
    }

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

    return { getGameBoard, resetGameBoard, setGameBoardVal, setWidth, setHeigth, setCells, getWidth, getHeigth, getCells }
})();

const Settings = (() => {
    const defaultPresets = (() => {
        const GameBoardPreset = (() => {
            GameBoard.setWidth(3);
            GameBoard.setHeigth(3);
            GameBoard.setCells(9);
        });



    })
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
                        : false;
    }

    const checkHorizontal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, unchanged], [++x, y, maxE, minE, increment, unchanged]);
        return result;
    }

    const checkVertical = (x, y) => {
        let result = check([x, y, minE, minE, unchanged, decrement], [x, ++y, maxE, maxE, unchanged, increment]);
        return result;
    }

    const checkLeftDiagonal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, decrement], [++x, ++y, maxE, maxE, increment, increment]);
        return result;
    }

    const checkRightDiagonal = (x, y) => {
        let result = check([x, y, maxE, minE, increment, decrement], [--x, ++y, minE, maxE, decrement, increment]);
        return result;
    }

    const check = (args1, args2) => {
        let part1 = measuringDeviceFabric(...args1);
        let part2 = measuringDeviceFabric(...args2);
        return part1 + part2;
    }

    const measuringDeviceFabric = (x, y, xBool, yBool, functionX, functionY, score = 0) => {
        if (xBool(x) && yBool(y)) {
            if (gameBoard[y][x] === playerMark) {
                ++score;
                return measuringDeviceFabric(functionX(x), functionY(y), xBool, yBool, functionX, functionY, score);
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

    const unchanged = (e) => {
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

export { fillGameBoard, MoveHundler, GameBoard };