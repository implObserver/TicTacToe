import { Tools } from "../../helper/tools.js";
import { AddListener } from "../../controllers/listeners/gamePage.js";
import { Templates } from "../../views/images/markers/markers.js";
import { GamePage } from "../selectors/gamePageSelectors.js";
import { GameHandler } from "./gameHandlerModels.js";
import { BoardAi } from "../aiModels.js";

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

    const getGameBoardVal = (x, y) => {
        return gameBoard[x][y];
    }

    return { getGameBoardVal, getGameBoard, resetGameBoard, setGameBoard, setGameBoardVal, setWidth, setHeigth, getWidth, getHeigth, setOverAllSize, getOverAllSize }
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
        drawnCells = [];
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
    let flag;

    const setWinLine = (length) => {
        winLine = length;
    }

    const checkWinnable = (x, y, mark, thisFlag = 'move') => {
        flag = thisFlag;
        playerMark = mark;
        return checkHorizontal(x, y) ? win()
            : checkVertical(x, y) ? win()
                : checkLeftDiagonal(x, y) ? win()
                    : checkRightDiagonal(x, y) ? win()
                        : false;
    }

    const win = () => {
        if (flag === 'move') {
            NodeGameBoard.victoryLineMarking(buff);
            return true;
        }
        return true;
    }

    const checkHorizontal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, unchanged], [++x, y, maxX, minE, increment, unchanged]);
        if (result >= winLine) {
            return true;
        } else {
            return false;
        }
    }

    const checkVertical = (x, y) => {
        let result = check([x, y, minE, minE, unchanged, decrement], [x, ++y, maxX, maxY, unchanged, increment]);
        if (result >= winLine) {
            return true;
        } else {
            return false;
        }
    }

    const checkLeftDiagonal = (x, y) => {
        let result = check([x, y, minE, minE, decrement, decrement], [++x, ++y, maxX, maxY, increment, increment]);
        if (result >= winLine) {
            return true;
        } else {
            return false;
        }
    }

    const checkRightDiagonal = (x, y) => {
        let result = check([x, y, maxX, minE, increment, decrement], [--x, ++y, minE, maxY, decrement, increment]);
        if (result >= winLine) {
            return true;
        } else {
            return false;
        }
    }

    const check = (args1, args2) => {
        buff = [];
        let step1 = measuringDeviceFabric(...args1);
        let step2 = measuringDeviceFabric(...args2);
        return step1 + step2;
    }

    const measuringDeviceFabric = (x, y, xBool, yBool, functionX, functionY, score = 0) => {
        let gameBoard;
        if (flag === 'ai') {
            gameBoard = BoardAi.getBoard();
        } else {
            gameBoard = GameBoard.getGameBoard();
        }
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
    let length = 3;
    let greens = [0, 1, 2];
    const setLength = (val) => {
        length = val;
    }

    const getLength = () => {
        return length;
    }

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
        greens = [];
        let cells = document.querySelectorAll('.optional');
        for (let i = 0; i <= ind; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].appendChild(Templates.getCross());
            greens.push(i);
        }
    }

    const opacityLow = () => {
        let cells = document.querySelectorAll('.optional');
        for (let i = 0; i <= 9; i++) {
            if (greens.indexOf(i) === -1) {
                cells[i].style.opacity = 0.2;
                cells[i].style.pointerEvents = 'none';
            }
        }
        opacityHigh();
    }

    const opacityHigh = () => {
        let cells = document.querySelectorAll('.optional');
        let max = Math.max(GameBoard.getHeigth(), GameBoard.getWidth());
        for (let i = 0; i <= 9; i++) {
            if (greens.indexOf(i) === -1) {
                if (i < max) {
                    cells[i].style.opacity = 1;
                    cells[i].style.pointerEvents = 'auto';
                }
            }
        }
    }

    const clear = (ind = 9) => {
        let cells = document.querySelectorAll('.optional');
        for (let i = 0; i <= ind; i++) {
            cells[i].style.backgroundColor = '#d1eeec';
            Tools.removeChilds(cells[i]);
        }
    }
    return { opacityLow, setLength, getLength, fill, setting };
})();

const MobilePageOptions = (() => {
    let card = Tools.createNode('div', 'options-wrapper');
    const counter = () => {
        let counter = Tools.createNode('div', 'round-number__mobile');
        let span = Tools.setUpSpan('Round: 1');
        Tools.appendChilds(counter, span);
        return counter;
    }

    const exit = () => {
        let wrapper = Tools.createNode('div', 'mobile-exit__wrapper');
        let icon = Tools.createNode('div', 'icon-wrapper', 'mobile-exit');
        wrapper.appendChild(icon);
        return wrapper;
    }

    Tools.appendChilds(card, counter(), exit());
    return card;
})();

const AudioEffects = (() => {
    const cross = (() => {
        let audio = new Audio('../audio/cross.mp3');
        audio.playbackRate = 3;
        return audio;
    })();

    const aiCross = (() => {
        let audio = new Audio('../audio/terminatorCross.mp3');
        audio.playbackRate = 2.3;
        return audio;
    })();

    const circle = (() => {
        let audio = new Audio('../audio/zero.mp3');
        audio.playbackRate = 2;
        return audio;
    })();

    const winRound = (() => {
        let audio = new Audio('../audio/winRound.mp3');
        audio.volume = 0.5;
        return audio;
    })();

    const draw = (() => {
        let audio = new Audio('../audio/wow.mp3');
        audio.volume = 0.5;
        return audio;
    })();

    const win = (() => {
        let audio = new Audio('../audio/win.mp3');
        return audio;
    })();

    const timer = (() => {
        let audio = new Audio('../audio/timer.mp3');
        return audio;
    })();

    const nextMove = (() => {
        let audio = new Audio('../audio/nextMove.mp3');
        audio.playbackRate = 2;
        return audio;
    })();

    const openBurger = (() => {
        let audio = new Audio('../audio/openBurger.mp3');
        return audio;
    })();

    const closeBurger = (() => {
        let audio = new Audio('../audio/closeBurger.mp3');
        audio.playbackRate = 2;
        return audio;
    })();

    const addPlayer = (() => {
        let audio = new Audio('../audio/addPlayer.mp3');
        audio.playbackRate = 1.5;
        return audio;
    })();

    const deletePlayer = (() => {
        let audio = new Audio('../audio/deletePlayer.mp3');
        audio.playbackRate = 1.5;
        return audio;
    })();

    const choisWinLine = (() => {
        let audio = new Audio('../audio/winLine.mp3');
        return audio;
    })();

    const getTerminator = (() => {
        let audio = new Audio('../audio/terminator.mp3');
        return audio;
    })();

    const lose = (() => {
        let audio = new Audio('../audio/hasta-la-vista.mp3');
        return audio;
    })();

    const gameOverAi = (() => {
        let audio = new Audio('../audio/terminatorEnd.mp3');
        return audio;
    })();

    return { aiCross, gameOverAi, lose, getTerminator, cross, circle, winRound, draw, win, timer, nextMove, openBurger, closeBurger, addPlayer, deletePlayer, choisWinLine };
})();
export { GameBoard, NodeGameBoard, MoveHandler, winlineBar, MobilePageOptions, AudioEffects }