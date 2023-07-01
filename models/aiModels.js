import { GameBoard, MoveHandler } from "./gamePageModels/gameBoardModels.js";
import { Session } from "./gamePageModels/states.js";

const BoardAi = (() => {
    let board;
    const setBoard = (val) => {
        board = val;
    }

    const getBoard = () => {
        return board;
    }
    return { getBoard, setBoard };
})();

const checkTie = (board) => {
    let tie = true;
    let width = GameBoard.getWidth();
    let height = GameBoard.getHeigth();
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (board[i][j] === -1) {
                tie = false;
            }
        }
    }
    return tie;
}

function bestMove() {
    let bestMove;
    let bestScore = -Infinity;
    let board = GameBoard.getGameBoard();
    let moveId = Session.getid();
    let player = Session.getPlayer(moveId);
    let marker = player.getId();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            moveId = Session.getid();
            if (board[j][i] === -1) {
                board[j][i] = marker;
                let score = minimax(board, marker, ++moveId, j, i, 0, marker, false);
                board[j][i] = -1;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { j, i };
                }
            }
        }
    }
    return bestMove;
}

function minimax(board, cMarker, moveId, x, y, depth, reference, isMaximizing) {
    if (moveId >= Session.getPlayers().length) {
        moveId = 0;
    }

    if (checkTie(board)) {
        return 0;
    }

    BoardAi.setBoard(board);

    let result = MoveHandler.checkWinnable(y, x, cMarker, 'ai');

    if (result) {

        if (cMarker === reference) {
            return 1;
        } else {
            return -1;
        }
    }

    let marker = Session.getPlayer(moveId).getId();

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[j][i] === -1) {
                    board[j][i] = marker;
                    let score = minimax(board, marker, ++moveId, j, i, ++depth, reference, false);
                    --moveId;
                    board[j][i] = -1;
                    marker = Session.getPlayer(moveId).getId();
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[j][i] === -1) {
                    board[j][i] = marker;
                    let score = minimax(board, marker, ++moveId, j, i, depth, reference, true);
                    --moveId;
                    board[j][i] = -1;
                    marker = Session.getPlayer(moveId).getId();
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

export { bestMove, BoardAi };