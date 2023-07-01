import { GamePage } from "../selectors/gamePageSelectors.js";
import { GameBoard, MobilePageOptions, NodeGameBoard, winlineBar } from "./gameBoardModels.js";
import { addPlayScore } from "./burgerMenuModels.js";
import { Templates } from "../../views/images/markers/markers.js";
import { Animations } from "../../views/animations/animations.js";
import { GameHandler } from "./gameHandlerModels.js";
import { Tools } from "../../helper/tools.js";
import { UniversalAnimations } from "../../views/animations/gamePage.js";
import { changeOpacityCards } from "./playerCardModel.js";

const Session = (() => {
    let moveId;
    let idList = [0, 1, 2, 3];
    let rounds = 3;
    let currentRound = 1;
    let players = [];

    const setScore = (id) => {
        players[id].setScore();
    }

    const getScore = (id) => {
        return players[id].getScore();
    }

    const setId = (id) => {
        moveId = id;
    }

    const getid = () => {
        return moveId;
    }

    const addPlayer = (player) => {
        players.push(player);
    }

    const deletePlayer = (delPlayer) => {
        players = players.filter((player) => player !== delPlayer);
    }

    const getPlayer = (id) => {
        return players[id];
    }

    const getPlayers = () => {
        return players;
    }

    const getRounds = () => {
        return rounds;
    }

    const setRounds = (val) => {
        rounds = val;
    }

    const getCurrentRound = () => {
        return currentRound;
    }

    const setCurrentRound = () => {
        ++currentRound;
    }

    const endSession = () => {
        moveId = 0;
        rounds = 3;
        currentRound = 1;
        for (let player of players) {
            player.resetScore();
        }
    }

    const getIdList = () => {
        return idList;
    }

    const removeId = () => {
        return idList.shift();
    }

    const returnId = (id) => {
        idList.unshift(id);
    }

    return { getIdList, removeId, returnId, deletePlayer, endSession, setScore, getScore, setId, getid, addPlayer, getPlayer, getPlayers, getRounds, setRounds, getCurrentRound, setCurrentRound };
})();

const BeforeStartPlay = () => {
    winlineBar.setting(2);
    GamePage.Body.gameBoard.style.pointerEvents = 'none';
    document.querySelector('.gif').style.pointerEvents = 'none';
    document.querySelector('.gif2').style.pointerEvents = 'none';
    document.querySelector('.gif3').style.pointerEvents = 'none';
    document.querySelector('.gif4').style.pointerEvents = 'none';
    document.querySelector('.gif5').style.pointerEvents = 'none';
};

const AfterStartPlay = () => {
    changeOpacityCards(0.2);
    GamePage.Body.body.appendChild(MobilePageOptions);
    GamePage.Body.playerCards.style.pointerEvents = 'none';
    GamePage.Body.winlineBar.style.width = '40vh';
    GamePage.Body.winlineBar.style.height = '3vh';
    GamePage.Body.body.insertBefore(Tools.createNode('div', 'mobile-timer'), GamePage.Body.body.firstChild);
    GamePage.Wrapper.appendChild(GamePage.BurgerMenu.closed);
    GamePage.Body.displayTimer.style.display = 'flex';
    GamePage.Body.timer.style.display = 'flex';

    UniversalAnimations.SmoothVisibility.open(GamePage.Body.timer, 0, 1, 200, 'forwards');
    UniversalAnimations.SmoothVisibility.open(GamePage.Body.displayTimer, 0, 1, 200, 'forwards');
    GamePage.Body.playMobile.style.display = 'none';
    GamePage.Body.gameBoard.style.pointerEvents = 'auto';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'none';
    }
    let baskets = document.querySelectorAll('.delete');
    for (let basket of baskets) {
        basket.style.opacity = 0;
        basket.style.visibility = 'hidden';
    }
    let scores = document.querySelectorAll('.score');
    for (let score of scores) {
        score.style.opacity = 1;
        score.style.visibility = 'visible';
    }
    GamePage.Body.rangers.style.display = 'none';
    GamePage.BurgerMenu.opened.style.display = 'grid';
    GamePage.Body.winlineBar.style.pointerEvents = 'none';
    GamePage.Body.templateCard.style.display = 'none';
    NodeGameBoard.draw();
    addPlayScore();
    GamePage.BurgerMenu.roundCounter.textContent = `Round:${Session.getCurrentRound()}`;
};

const AfterEndPlay = () => {
    Session.endSession();
    changeOpacityCards(1);
    GameHandler.move.endGame();
    GamePage.Body.body.removeChild(GamePage.Body.body.firstChild);
    GamePage.Body.body.removeChild(MobilePageOptions);
    GamePage.Wrapper.removeChild(GamePage.Wrapper.children[1]);
    GamePage.Body.playerCards.style.pointerEvents = 'auto';
    GamePage.Body.displayTimer.style.display = 'none';
    GamePage.Body.playMobile.style.display = 'flex';
    GamePage.Body.gameBoard.style.pointerEvents = 'none';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'grid';
    }

    let baskets = document.querySelectorAll('.delete');
    for (let basket of baskets) {
        basket.style.opacity = 1;
        basket.style.visibility = 'visible';
    }
    let scores = document.querySelectorAll('.score');
    for (let score of scores) {
        score.style.opacity = 0;
        score.style.visibility = 'hidden';
    }
    GamePage.Body.timer.style.display = 'none';
    GamePage.Body.rangers.style.display = 'grid';
    GamePage.Body.winlineBar.style.pointerEvents = 'auto';
    if (Session.getPlayers().length <= 3) {
        GamePage.Body.templateCard.style.display = 'grid';
    }
    GameBoard.setOverAllSize(40);
    NodeGameBoard.draw();
}

export { BeforeStartPlay, AfterStartPlay, Session, AfterEndPlay };