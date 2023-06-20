import { GamePage } from "../selectors/gamePageSelectors.js";
import { winlineBar } from "./gameBoardModel.js";
import { addPlayScore } from "./burgerMenuModel.js";

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
    GamePage.Body.gameBoard.style.pointerEvents = "none";
};

const AfterStartPlay = () => {
    GamePage.Body.gameBoard.style.pointerEvents = 'auto';
    let tutorials = Array.from(GamePage.Body.tutorials);
    for (let msg of tutorials) {
        msg.style.display = 'none';
    }
    GamePage.Body.rangers.style.display = 'none';
    GamePage.Body.playWrapper.style.display = 'none';
    GamePage.BurgerMenu.closed.style.display = 'grid';
    addPlayScore();
};

export { gamePage, BeforeStartPlay, AfterStartPlay };