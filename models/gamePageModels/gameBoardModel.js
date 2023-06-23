import { Tools } from "../../helper/tools.js";
import { AddListener } from "../../controllers/listeners/gamePage.js";
import { Templates } from "../../views/images/markers/markers.js";
import { GamePage } from "../selectors/gamePageSelectors.js";
import { GameHandler } from "./gameHandlerModels.js";

const GameBoard = (() => {
    let width = 0;
    let height = 0;
    let gameBoard = 0;
    let overAllSize = 0;

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

    const setOverAllSize = (val) => {
        overAllSize = val;
    }

    const getOverAllSize = (val) => {
        return overAllSize;
    }

    const fillGameBoard = () => {
        let gameBoard = [];
        for (let i = 0; i < height; i++) {
            let line = []
            for (let j = 0; j < width; j++) {
                line[j] = -1;
            }
            gameBoard[i] = line;
        }
        return gameBoard;
    }

    const getGameBoard = () => {
        return gameBoard;
    }

    const resetGameBoard = () => {
        gameBoard = fillGameBoard();
    }

    const setGameBoardVal = (x, y, val) => {
        gameBoard[y][x] = val;
    }

    const setGameBoard = () => {
        gameBoard = fillGameBoard();
    }

    return { getGameBoard, resetGameBoard, setGameBoard, setGameBoardVal, setWidth, setHeigth, getWidth, getHeigth, setOverAllSize, getOverAllSize }
})();

const Cell = () => {
    let x = 0;
    let y = 0;
    let node = 0;
    let empty = true;

    const setCoordinates = (xVal, yVal) => {
        x = xVal;
        y = yVal;
    }

    const setNode = (nodeVal) => {
        node = nodeVal;
    }

    const isEmpty = () => {
        return empty;
    }

    const fill = () => {
        empty = false;
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

    return { fill, isEmpty, setCoordinates, setNode, getX, getY, getNode };
}

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
        GamePage.Body.gameBoard.style.gridTemplateColumns = `repeat(${width},${GameBoard.getOverAllSize() / Math.max(width, height)}vh)`;
        GamePage.Body.gameBoard.style.gridTemplateRows = `repeat(${height},${GameBoard.getOverAllSize() / Math.max(width, height)}vh)`;
    }

    const fill = () => {
        GameBoard.setGameBoard();

        for (let i = 0; i < height; i++) {
            let line = []
            for (let j = 0; j < width; j++) {
                let cell = createCell(j, i, true);
                AddListener.cell(cell);
                GamePage.Body.gameBoard.appendChild(cell.getNode());
                line[j] = cell;
            }
            drawnCells[i] = line;
        }
    }

    const createCell = (x, y) => {
        let cell = Cell();
        cell.setCoordinates(x, y);
        cell.setNode(Tools.createNode('div', 'cell'));
        return cell;
    }

    const getDrawnCells = () => {
        return drawnCells;
    }

    const victoryLineMarking = (buff) => {
        for (let xy of buff) {
            drawnCells[xy.y][xy.x].getNode().style.backgroundColor = 'green';
        }
    }

    return { draw, getDrawnCells, createCell, victoryLineMarking };
})();

const MoveHandler = (() => {
    let playerMark;
    let winLine = 3;
    let buff = [];

    const setWinLine = (length) => {
        winLine = length;
    }

    const checkWinnable = (x, y, mark) => {
        playerMark = mark;
        return checkHorizontal(x, y) >= winLine ? win()
            : checkVertical(x, y) >= winLine ? win()
                : checkLeftDiagonal(x, y) >= winLine ? win()
                    : checkRightDiagonal(x, y) >= winLine ? win()
                        : false;
    }

    const win = () => {
        console.log(buff);
        NodeGameBoard.victoryLineMarking(buff);
        return true;
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
        buff = [];
        let step1 = measuringDeviceFabric(...args1);
        let step2 = measuringDeviceFabric(...args2);
        return step1 + step2;
    }

    const measuringDeviceFabric = (x, y, xBool, yBool, functionX, functionY, score = 0) => {
        let gameBoard = GameBoard.getGameBoard();
        if (xBool(x) && yBool(y)) {
            if (gameBoard[y][x] === playerMark) {
                ++score;
                buff.push({ x: x, y: y });
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

const winlineBar = (() => {
    const fill = () => {
        Tools.removeChilds(GamePage.Body.winlineBar);
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = NodeGameBoard.createCell(j, i);
                AddListener.optionalCell(cell);
                Tools.addClasses(cell.getNode(), 'optional');
                GamePage.Body.winlineBar.appendChild(cell.getNode());
            }
        }
    };

    const setting = (ind) => {
        clear();
        let cells = document.querySelectorAll('.optional');
        for (let i = 0; i <= ind; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].appendChild(Templates.getCross());
        }
    }

    const clear = (ind = 9) => {
        let cells = document.querySelectorAll('.optional');
        for (let i = 0; i <= ind; i++) {
            cells[i].style.backgroundColor = '#d1eeec';
            Tools.removeChilds(cells[i]);
        }
    }
    return { fill, setting };
})();

export { GameBoard, NodeGameBoard, MoveHandler, winlineBar }