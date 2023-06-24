import { GamePage } from "../selectors/gamePageSelectors.js";
import { GameBoard, NodeGameBoard, winlineBar } from "./gameBoardModel.js";
import { addPlayScore } from "./burgerMenuModel.js";
import { Templates } from "../../views/images/markers/markers.js";
import { Animations } from "../../views/animations/animations.js";
import { GameHandler } from "./gameHandlerModels.js";

const Session = (() => {
    let playerId;
    let rounds = 2;
    let currentRound = 1;
    let players = [];
    let scores = [0, 0, 0, 0];

    const setScore = (id) => {
        ++scores[id];
    }

    const getScore = (id) => {
        return scores[id];
    }

    const setId = (id) => {
        playerId = id;
    }

    const getid = () => {
        return playerId;
    }

    const addPlayer = (player) => {
        players.push(player);
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
        console.log('www');
        playerId = 0;
        rounds = 3;
        currentRound = 1;
        scores = [0, 0, 0, 0];
    }

    return { endSession, setScore, getScore, setId, getid, addPlayer, getPlayer, getPlayers, getRounds, setRounds, getCurrentRound, setCurrentRound };
})();

const gamePage = (() => {
    let gameBoard;
})();

const BeforeStartPlay = () => {
    winlineBar.setting(2);
    GamePage.Body.gameBoard.style.pointerEvents = 'none';
    document.querySelector('.gif').style.pointerEvents = 'none';
    document.querySelector('.gif2').style.pointerEvents = 'none';
    document.querySelector('.gif3').style.pointerEvents = 'none';
    GamePage.Body.playerCards.style.bottom = null;
    GamePage.Body.timer.style.display = 'none';
};

const AfterStartPlay = () => {
    GamePage.Wrapper.appendChild(GamePage.BurgerMenu.closed);
    GamePage.Body.playMobile.style.display = 'none';
    GamePage.Body.gameBoard.style.pointerEvents = 'auto';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'none';
    }
    GamePage.Body.timer.style.display = 'flex';
    //GamePage.Body.itemsWrapper.style.gap = '2vh';
    //GamePage.Body.itemsWrapper.style.left = '9vh';
    GamePage.Body.rangers.style.display = 'none';
    GamePage.BurgerMenu.opened.style.display = 'grid';
    GamePage.Body.playWrapper.style.display = 'none';
    GamePage.Body.winlineBar.style.pointerEvents = 'none';
    GamePage.Body.templateCard.style.display = 'none';
    //GamePage.Body.playerCards.style.bottom = '7vh';
    //GamePage.Body.winlineBar.style.top = '3vh';
    GameBoard.setOverAllSize(60);
    NodeGameBoard.draw();
    addPlayScore();
    GamePage.BurgerMenu.roundCounter.textContent = `Round:${Session.getCurrentRound()}`;
};

const AfterEndPlay = () => {
    GameHandler.move.endGame();
    GamePage.Wrapper.removeChild(GamePage.BurgerMenu.closed);
    GamePage.Body.playMobile.style.display = 'flex';
    GamePage.Body.gameBoard.style.pointerEvents = 'none';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'grid';
    }
    GamePage.Body.timer.style.display = 'none';
    GamePage.Body.itemsWrapper.style.gap = null;
    GamePage.Body.itemsWrapper.style.left = null;
    GamePage.Body.rangers.style.display = 'grid';
    GamePage.Body.playWrapper.style.display = 'grid';
    GamePage.BurgerMenu.opened.style.display = 'none';
    GamePage.Body.winlineBar.style.pointerEvents = 'auto';
    GamePage.Body.playerCards.style.bottom = null;
    GamePage.Body.winlineBar.style.top = null;
    if (Session.getPlayers().length <= 3) {
        GamePage.Body.templateCard.style.display = 'grid';
    }
    GameBoard.setOverAllSize(40);
    NodeGameBoard.draw();

}

export { gamePage, BeforeStartPlay, AfterStartPlay, Session, AfterEndPlay };