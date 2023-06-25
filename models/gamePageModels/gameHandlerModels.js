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
        let mobileTimerColor;
        let mobileTimerState;

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

        const removeTimers = () => {
            let mobileTimer = document.querySelector('.mobile-timer');
            Tools.removeChilds(GamePage.Body.timer);
            Tools.removeChilds(mobileTimer);
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
            removeTimers();
            addMobileTimer();
            let timer = Templates.getTimer();
            timerColor = AnimationsPresets.ForGamePage.ForTimer.colorIndicator(timer);
            timerState = AnimationsPresets.ForGamePage.ForTimer.drawIndicator(timer);
            GamePage.Body.timer.appendChild(timer);
            viewSeconds();
        }

        const addMobileTimer = () => {
            let mobileTimer = Templates.getMobileTimer();
            mobileTimerColor = AnimationsPresets.ForGamePage.ForTimer.colorIndicator(mobileTimer);
            mobileTimerState = mobileTimer.firstChild.animate([{ strokeDashoffset: '142%' }, { strokeDashoffset: '0' }], { duration: 30000 });
            document.querySelector('.mobile-timer').appendChild(mobileTimer);
            document.querySelector('.mobile-timer').appendChild(Tools.setUpSpan(''));
        }

        const viewSeconds = () => {
            let mobileTimer = document.querySelector('.mobile-timer');
            mobileTimer.querySelector('span').textContent = '0:30';
            GamePage.Body.displayTimer.textContent = '0:30';
            let seconds = 29;
            interval = setInterval(() => {
                let curSecond = seconds >= 10 ? `0:${seconds}` : `0:0${seconds}`;
                GamePage.Body.displayTimer.textContent = curSecond;
                mobileTimer.querySelector('span').textContent = curSecond;
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
                mobileTimerColor.pause();
                mobileTimerState.pause();
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
            let mobileScores = Array.from(document.querySelectorAll('.score > span'));
            Session.setScore(id);
            scores[id].textContent = Session.getScore(id);
            mobileScores[id].textContent = Session.getScore(id);
            for (let player of players) {
                let span = Tools.setUpSpan(`${player.getName()} - ${player.getScore()}`);
                GamePage.Popups.applouseRound.scorePreView.appendChild(span);
            }
        }

        const addRound = () => {
            GamePage.Popups.applouseRound.roundPreview.textContent = `Round: ${Session.getCurrentRound()}`;
            Session.setCurrentRound();
            GamePage.BurgerMenu.roundCounter.textContent = `Round: ${Session.getCurrentRound()}`;
            document.querySelector('.round-number__mobile').textContent = `Round: ${Session.getCurrentRound()}`;
        }

        const gameOver = () => {
            timerColor.pause();
            timerState.pause();
            mobileTimerColor.pause();
            mobileTimerState.pause();
            GamePage.Popups.gameOver.popup.style.opacity = 1;
            GamePage.Popups.gameOver.popup.style.visibility = 'visible';
            GamePage.Popups.gameOver.winner.textContent = `${Session.getPlayer(id).getName()} is WON!!`;
            GamePage.Body.gameBoard.style.pointerEvents = 'none';
        }

        const draw = () => {
            timerColor.pause();
            timerState.pause();
            mobileTimerColor.pause();
            mobileTimerState.pause();
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

        const removeScores = () => {
            let mobileScores = Array.from(document.querySelectorAll('.score > span'));
            for (let score of mobileScores) {
                score.textContent = 0;
            }
        }

        const endGame = () => {
            resetTimer();
            removeTimers();
            setPlayer(1, 1);
            removeScores();
            id = -1;
        }



        return { nextMove, winnableMoveInit, newRound, endGame };
    })();

    return { play, move };
})();

export { GameHandler };