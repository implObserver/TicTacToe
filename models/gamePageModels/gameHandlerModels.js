import { GamePage } from "../selectors/gamePageSelectors.js";
import { Templates } from "../../views/images/markers/markers.js";
import { Session } from "./states.js";
import { Tools } from "../../helper/tools.js";
import { AnimationsPresets, UniversalAnimations } from "../../views/animations/gamePage.js";
import { AudioEffects, NodeGameBoard } from "./gameBoardModels.js";
import { BurgerMenu } from "./burgerMenuModels.js";
import { bestMove } from "../aiModels.js";
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
        let activePlayer;

        const winnableMoveInit = () => {
            addScores();
            addRound();
            if (Session.getScore(id) === Session.getRounds()) {
                nextMove('win');
            } else {
                nextMove('round');
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
            GamePage.Body.mobileRoundsCounter().textContent = `Round: ${Session.getCurrentRound()}`;
        }

        const nextMove = (flag = 'regular') => {
            GamePage.Body.gameBoard.style.pointerEvents = 'auto';
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

        const addTimer = () => {
            let timer = Templates.getTimer();
            removeTimers();
            addMobileTimer();
            timerColor = AnimationsPresets.ForGamePage.ForTimer.colorIndicator(timer);
            timerState = AnimationsPresets.ForGamePage.ForTimer.drawIndicator(timer);
            GamePage.Body.timer.appendChild(timer);
            viewSeconds();
        }

        const removeTimers = () => {
            Tools.removeChilds(GamePage.Body.timer);
            Tools.removeChilds(GamePage.Body.mobileTimer());
        }

        const addMobileTimer = () => {
            let mobileTimer = Templates.getMobileTimer();
            mobileTimerColor = AnimationsPresets.ForGamePage.ForTimer.colorIndicator(mobileTimer);
            mobileTimerState = mobileTimer.firstChild.animate([{ strokeDashoffset: '142%' }, { strokeDashoffset: '0' }], { duration: 30000 });
            Tools.appendChilds(GamePage.Body.mobileTimer(), mobileTimer, Tools.setUpSpan(''));
        }

        const viewSeconds = () => {
            let isAi = Session.getPlayer(Session.getid()).isAi();
            let move;
            if (isAi) {
                GamePage.Body.gameBoard.style.pointerEvents = 'none';
                move = bestMove();
            }
            GamePage.Body.mobileTimer().querySelector('span').textContent = '0:30';
            GamePage.Body.displayTimer.textContent = '0:30';
            let seconds = 29;

            interval = setInterval(() => {
                let curSecond = seconds >= 10 ? `0:${seconds}` : `0:0${seconds}`;
                if (isAi && seconds === 29) {
                    let cell = NodeGameBoard.getDrawnCells()[move.j][move.i].getNode();
                    cell.click();
                }
                if (seconds === 5) {
                    AudioEffects.timer.play();
                }
                GamePage.Body.displayTimer.textContent = curSecond;
                GamePage.Body.mobileTimer().querySelector('span').textContent = curSecond;
                if (seconds === 0) {
                    nextMove();
                }
                --seconds;
            }, 1000);
        }

        const setPlayer = () => {
            let cards = GamePage.Body.getAllPlayerCards();
            if (activePlayer !== undefined) {
                activePlayer.reverse();
            }
            activePlayer = cards[id].animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
        }

        const newRound = (flag = 'endRound') => {
            if (flag === 'endRound') {
                allTimerPause();
                if (Session.getPlayer(id).getName() === 'Terminator') {
                    setTimeout(() => {
                        AudioEffects.lose.play();
                        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.lose.popup, 0, 1, 200, 'forwards');
                    }, 500);
                } else {
                    setTimeout(() => {
                        AudioEffects.winRound.play();
                        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.applouseRound.popup, 0, 1, 200, 'forwards');
                        GamePage.Popups.applouseRound.roundWinner.textContent = `${Session.getPlayer(id).getName()} WINS THIS ROUND!!`
                    }, 500);
                }
            }
            if (flag === 'startRound') {
                console.log(id);
                NodeGameBoard.draw();
                nextMove();
            }
        }

        const gameOver = () => {
            allTimerPause();
            if (Session.getPlayer(id).getName() === 'Terminator') {
                setTimeout(() => {
                    AudioEffects.gameOverAi.play();
                    UniversalAnimations.SmoothVisibility.open(GamePage.Popups.gameOverAi.popup, 0, 1, 200, 'forwards');
                    GamePage.Body.gameBoard.style.pointerEvents = 'none';
                }, 500);
            } else {
                AudioEffects.win.play();
                setTimeout(() => {
                    UniversalAnimations.SmoothVisibility.open(GamePage.Popups.gameOver.popup, 0, 1, 200, 'forwards');
                    GamePage.Popups.gameOver.winner.textContent = `${Session.getPlayer(id).getName()} is WON!!`;
                    GamePage.Body.gameBoard.style.pointerEvents = 'none';
                }, 1000);
            }
        }

        const draw = () => {
            AudioEffects.draw.play();
            allTimerPause();
            setTimeout(() => {
                UniversalAnimations.SmoothVisibility.open(GamePage.Popups.draw.popup, 0, 1, 200, 'forwards');
                addRound();
            }, 500);
        }

        const allTimerPause = () => {
            timerColor.pause();
            timerState.pause();
            mobileTimerColor.pause();
            mobileTimerState.pause();
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
            GamePage.Body.mobileRoundsCounter().textContent = `Round: 1`;
            resetTimer();
            removeTimers();
            removeScores();
            id = -1;
        }

        const removeScores = () => {
            let mobileScores = Array.from(document.querySelectorAll('.score > span'));
            for (let score of mobileScores) {
                score.textContent = 0;
            }
        }

        return { nextMove, winnableMoveInit, newRound, endGame };
    })();

    return { play, move };
})();

export { GameHandler };