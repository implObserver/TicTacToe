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
            stopTimer();
            if (flag === 'round') {
                newRound();
            } if (flag === 'win') {
                gameOver();
            } if (flag === 'regular') {
                currentMove();
            }
        }

        const stopTimer = () => {
            clearInterval(interval);
        }

        const currentMove = () => {

            if (id >= Session.getPlayers().length - 1) {
                id = 0;
            } else {
                ++id;
            }

            Session.setId(id);
            addTimer();
            setPlayer();
        }

        const winnableMoveInit = () => {
            if (Session.getCurrentRound() === Session.getRounds()) {
                nextMove('win');
            } else {
                nextMove('round');
            }
        }

        const addTimer = () => {
            Tools.removeChilds(GamePage.Body.timer);
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

        const setPlayer = () => {
            let playerQuantity = Session.getPlayers().length;
            let cards = document.querySelectorAll('.player-card');
            for (let i = 0; i < playerQuantity; i++) {
                if (i != id) {
                    cards[i].style.opacity = '0.2';
                } else {
                    cards[i].style.opacity = '1';
                }
            }
        }

        const newRound = (flag = 'endRound') => {
            if (flag === 'endRound') {
                timerColor.pause();
                timerState.pause();
                GamePage.Popups.applouseRound.popup.style.opacity = 1;
                GamePage.Popups.applouseRound.popup.style.visibility = 'visible';
                addScores();
                addRound();
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
            Session.setCurrentRound();
            GamePage.BurgerMenu.roundCounter.textContent = `Round: ${Session.getCurrentRound()}`;
        }

        const gameOver = () => {

        }

        return { nextMove, winnableMoveInit, newRound };
    })();

    return { play, move };
})();

export { GameHandler };