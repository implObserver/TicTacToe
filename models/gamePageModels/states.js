import { GamePage } from "../selectors/gamePageSelectors.js";
import { GameBoard, NodeGameBoard, winlineBar } from "./gameBoardModel.js";
import { addPlayScore } from "./burgerMenuModel.js";
import { Templates } from "../../views/images/markers/markers.js";
import { Animations } from "../../views/animations/animations.js";

const gamePage = (() => {
    let players = [];
    let gameBoard;
    const addPlayer = (player) => {
        players.push(player);
    }

    const getPlayers = () => {
        return players;
    }
    return { addPlayer, getPlayers };
})();

const BeforeStartPlay = () => {
    winlineBar.setting(2);
    GamePage.Body.gameBoard.style.pointerEvents = 'none';
    GamePage.Body.playerCards.style.bottom = null;
    GamePage.Body.timer.style.display = 'none';
};

const AfterStartPlay = () => {
    GamePage.Body.gameBoard.style.pointerEvents = 'auto';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'none';
    }
    GamePage.Body.timer.style.display = 'flex';
    GamePage.Body.itemsWrapper.style.gap = '2vh';
    GamePage.Body.itemsWrapper.style.left = '9vh';
    GamePage.Body.rangers.style.display = 'none';
    GamePage.Body.playWrapper.style.display = 'none';
    GamePage.BurgerMenu.closed.style.display = 'grid';
    GamePage.Body.winlineBar.style.pointerEvents = 'none';
    GamePage.Body.templateCard.style.display = 'none';
    GamePage.Body.playerCards.style.bottom = '7vh';
    GamePage.Body.winlineBar.style.top = '3vh';
    GameBoard.setOverAllSize(60);
    NodeGameBoard.draw();
    addPlayScore();
};

export { gamePage, BeforeStartPlay, AfterStartPlay };