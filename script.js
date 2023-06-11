import { Tools } from './modules/tools.js';
import { DomElements, DynamicDomElements } from './modules/domElements.js';
import { Selectors } from './modules/selectors.js';
import * as exports from './modules/listeners.js';


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

GameBoard.getGameBoard()[0][0] = 1;
GameBoard.getGameBoard()[0][1] = 1;
GameBoard.getGameBoard()[0][2] = 1;

console.log(GameBoard.getGameBoard())

let player = Player();
player.setMark(1);

for (let i = 0; i < 2; i++) {
    let score = DynamicDomElements.playerScore();
    Selectors.container.appendChild(score);
}