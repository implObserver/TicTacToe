import { GamePage } from "../selectors/gamePage.js";
import { DynamicNodes } from "../nodes/gamePage.js";
import { Tools } from "../tools.js";
import { AddListener } from "../listeners/gamePage.js";

const GameBoard = (() => {
    let width = 0;
    let height = 0;
    let gameBoard = 0;

    const setWidth = (number) => {
        width = number;
    }

    const setHeigth = (number) => {
        height = number;
    }

    const getWidth = () => {
        return width;
    }

    const getHeigth = () => {
        return height;
    }

    const fillGameBoard = () => {
        let gameBoard = [];
        for (let i = 0; i < height; i++) {
            let line = []
            for (let j = 0; j < width; j++) {
                line[j] = 0;
            }
            gameBoard[i] = line;
        }
        return gameBoard;
    }

    const getGameBoard = () => {
        return gameBoard;
    }

    const resetGameBoard = () => {
        gameBoard = fillGameBoard(3, 3);
    }

    const setGameBoardVal = (x, y, val) => {
        gameBoard[y][x] = val;
    }

    const setGameBoard = () => {
        gameBoard = fillGameBoard();
    }

    return { getGameBoard, resetGameBoard, setGameBoard, setGameBoardVal, setWidth, setHeigth, getWidth, getHeigth }
})();

const NodeGameBoard = (() => {
    let width = 0;
    let height = 0;
    let drawnCells = [];

    const draw = () => {
        width = GameBoard.getWidth();
        height = GameBoard.getHeigth();
        clear();
        setSize();
        fill();
    }

    const clear = () => {
        Tools.removeChilds(GamePage.Body.gameBoard);
    }

    const setSize = () => {
        GamePage.Body.gameBoard.style.gridTemplateColumns = `repeat(${width},${60 / Math.max(width, height)}vh)`;
        GamePage.Body.gameBoard.style.gridTemplateRows = `repeat(${height},${60 / Math.max(width, height)}vh)`;
    }

    const fill = () => {
        GameBoard.setGameBoard();
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let cell = createCell(j, i);
                GamePage.Body.gameBoard.appendChild(cell.getNode());
                drawnCells.push(cell);
            }
        }
    }

    const createCell = (x, y) => {
        let cell = Cell();
        cell.setCoordinates(x, y);
        cell.setNode(DynamicNodes.cell());
        AddListener.cell(cell);
        return cell;
    }

    const getDrawnCells = () => {
        return drawnCells;
    }

    return { draw, getDrawnCells };
})();

const Cell = () => {
    let x = 0;
    let y = 0;
    let node = 0;

    const setCoordinates = (xVal, yVal) => {
        x = xVal;
        y = yVal;
    }

    const setNode = (nodeVal) => {
        node = nodeVal;
    }

    const getX = () => {
        return x;
    }

    const getY = () => {
        return y;
    }

    const getNode = () => {
        return node;
    }

    return { setCoordinates, setNode, getX, getY, getNode };
}

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
    let winLine = 3;

    const setWinLine = (length) => {
        winLine = length;
    }

    const checkWinnable = (x, y, mark) => {

        console.log(GameBoard.getGameBoard());
        playerMark = mark;
        return checkHorizontal(x, y) === winLine ? true
            : checkVertical(x, y) === winLine ? true
                : checkLeftDiagonal(x, y) === winLine ? true
                    : checkRightDiagonal(x, y) === winLine ? true
                        : false;
    }

    const checkHorizontal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, unchanged], [++x, y, maxX, minE, increment, unchanged]);
        return result;
    }

    const checkVertical = (x, y) => {
        let result = check([x, y, minE, minE, unchanged, decrement], [x, ++y, maxX, maxY, unchanged, increment]);
        return result;
    }

    const checkLeftDiagonal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, decrement], [++x, ++y, maxX, maxY, increment, increment]);
        return result;
    }

    const checkRightDiagonal = (x, y) => {
        let result = check([x, y, maxX, minE, increment, decrement], [--x, ++y, minE, maxY, decrement, increment]);
        return result;
    }

    const check = (args1, args2) => {
        let part1 = measuringDeviceFabric(...args1);
        let part2 = measuringDeviceFabric(...args2);
        return part1 + part2;
    }

    const measuringDeviceFabric = (x, y, xBool, yBool, functionX, functionY, score = 0) => {
        let gameBoard = GameBoard.getGameBoard();
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

    const maxY = (e) => {
        return e < GameBoard.getGameBoard().length;
    }

    const maxX = (e) => {
        return e < GameBoard.getGameBoard()[0].length;
    }

    return { checkWinnable, setWinLine };

})();

const Settings = (() => {
    const DefaultPresets = (() => {
        const GameBoardPreset = (() => {
            GameBoard.setWidth(3);
            GameBoard.setHeigth(3);
            MoveHundler.setWinLine(5);
        })();
        return { GameBoardPreset };
    })();
    return { DefaultPresets };
})();

export { Settings, NodeGameBoard, MoveHundler, GameBoard, Cell };