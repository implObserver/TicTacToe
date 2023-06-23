import { GamePage } from "../selectors/gamePageSelectors.js";
import { Templates } from "../../views/images/markers/markers.js";
import { Session, gamePage as stateGamePage } from "./states.js";
import { Tools } from "../../helper/tools.js";
import { AnimationsPresets } from "../../views/animations/gamePage.js";
import { NodeGameBoard } from "./gameBoardModel.js";
import { BurgerMenu } from "./burgerMenuModel.js";
const GameHandler = (() => {
    const play = () => {
        move.nextMove();
    }

    const move = ((id = -1) => {
        let interval;
        let timerColor;
        let timerState;

        const nextMove = (flag = 'regular') => {
            resetTimer();

            if (flag === 'round') {
                newRound();
            } if (flag === 'win') {
                gameOver();
            } if (flag === 'regular') {
                if (drawTest()) {
                    draw();
                } else {
                    currentMove();
                }
            }
        }

        const resetTimer = () => {
            clearInterval(interval);
        }

        const removeTimer = () => {
            Tools.removeChilds(GamePage.Body.timer);
        }

        const currentMove = () => {

            if (id >= Session.getPlayers().length - 1) {
                id = 0;
            } else {
                ++id;
            }

            Session.setId(id);
            addTimer();
            setPlayer(0.2, 1);
        }

        const winnableMoveInit = () => {
            addScores();
            addRound();
            if (Session.getScore(id) === Session.getRounds()) {
                nextMove('win');
            } else {
                nextMove('round');
            }
        }

        const addTimer = () => {
            removeTimer();
            let timer = Templates.getTimer();
            GamePage.Body.timer.appendChild(Tools.setUpSpan('0:30'));
            timerColor = AnimationsPresets.ForGamePage.ForTimer.colorIndicator(timer);
            timerState = AnimationsPresets.ForGamePage.ForTimer.drawIndicator(timer);
            GamePage.Body.timer.appendChild(timer);
            viewSeconds();
        }

        const viewSeconds = () => {
            let seconds = 30;
            interval = setInterval(() => {
                GamePage.Body.timer.querySelector('span').textContent = `0:${seconds}`;
                if (seconds === 0) {
                    nextMove();
                }
                --seconds;
            }, 1000);
        }

        const setPlayer = (op1, op2) => {
            let playerQuantity = Session.getPlayers().length;
            let cards = document.querySelectorAll('.player-card');
            for (let i = 0; i < playerQuantity; i++) {
                if (i != id) {
                    cards[i].style.opacity = op1;
                } else {
                    cards[i].style.opacity = op2;
                }
            }
        }

        const newRound = (flag = 'endRound') => {
            if (flag === 'endRound') {
                timerColor.pause();
                timerState.pause();
                GamePage.Popups.applouseRound.popup.style.opacity = 1;
                GamePage.Popups.applouseRound.popup.style.visibility = 'visible';
                GamePage.Popups.applouseRound.roundWinner.textContent = `${Session.getPlayer(id).getName()} WINS THIS ROUND!!`
            }
            if (flag === 'startRound') {
                NodeGameBoard.draw();
                nextMove();
            }
        }

        const addScores = () => {
            Tools.removeChilds(GamePage.Popups.applouseRound.scorePreView);
            let players = Session.getPlayers();
            let scores = Array.from(BurgerMenu.querySelectorAll('.game-page__burger__score-board__player-score__score > span'));
            Session.setScore(id);
            scores[id].textContent = Session.getScore(id);
            for (let player of players) {
                let span = Tools.setUpSpan(`${player.getName()} - ${Session.getScore(player.getId())}`);
                GamePage.Popups.applouseRound.scorePreView.appendChild(span);
            }
        }

        const addRound = () => {
            GamePage.Popups.applouseRound.roundPreview.textContent = `Round: ${Session.getCurrentRound()}`;
            Session.setCurrentRound();
            GamePage.BurgerMenu.roundCounter.textContent = `Round: ${Session.getCurrentRound()}`;
        }

        const gameOver = () => {
            timerColor.pause();
            timerState.pause();
            GamePage.Popups.gameOver.popup.style.opacity = 1;
            GamePage.Popups.gameOver.popup.style.visibility = 'visible';
            GamePage.Popups.gameOver.winner.textContent = `${Session.getPlayer(id).getName()} is WON!!`;
            GamePage.Body.gameBoard.style.pointerEvents = 'none';
        }

        const draw = () => {
            timerColor.pause();
            timerState.pause();
            GamePage.Popups.draw.popup.style.opacity = 1;
            GamePage.Popups.draw.popup.style.visibility = 'visible';
        }

        const drawTest = () => {
            let draw = true;
            let cells = NodeGameBoard.getDrawnCells();
            for (let line of cells) {
                for (let cell of line) {
                    if (cell.isEmpty()) {
                        draw = false;
                    }
                }
            }
            return draw;
        }

        const endGame = () => {
            resetTimer();
            removeTimer();
            setPlayer(1, 1);
            id = -1;
        }

        return { nextMove, winnableMoveInit, newRound, endGame };
    })();

    return { play, move };
})();

export { GameHandler };