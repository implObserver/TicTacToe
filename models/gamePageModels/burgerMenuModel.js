import { Tools } from "../../helper/tools.js";
import { gamePage as stateGamePage } from "./states.js";
import { GamePage } from "../selectors/gamePageSelectors.js";

const BurgerMenu = (() => {
    let burgerMenu = Tools.createNode('div', 'game-page__burger--opened');
    const header = () => {
        let header = Tools.createNode('div', 'game-page__burger__header');
        const closure = () => {
            let closure = Tools.createNode('div', 'icon-wrapper', 'game-page__burger__button--close');
            let spanUp = Tools.createNode('span', 'up');
            let spanMiddle = Tools.createNode('span', 'middle');
            let spanDown = Tools.createNode('span', 'down');
            Tools.appendChilds(closure, spanUp, spanMiddle, spanDown);
            return closure;
        }
        Tools.appendChilds(header, closure());
        return header;
    }
    const mainTitle = () => {
        let mainTitle = Tools.createNode('div', 'game-page__burger__main-title');
        const logo = () => {
            return Tools.createNode('div', 'icon-wrapper', 'logo');
        }
        const span = () => {
            return Tools.setUpSpan('TicTacToe');
        }

        Tools.appendChilds(mainTitle, logo(), span());
        return mainTitle;
    }

    const scoreBoard = () => {
        let scoreBoard = Tools.createNode('div', 'game-page__burger__score-board');
        const title = () => {
            let title = Tools.createNode('div', 'game-page__burger__score-board__title');
            const span = () => {
                return Tools.setUpSpan('Score Board:');
            }
            Tools.appendChilds(title, span());
            return title;
        }
        const container = () => {
            return Tools.createNode('div', 'game-page__burger__score-board__container');
        }
        const counter = () => {
            return Tools.createNode('div', 'game-page__burger__score-board__round-counter');
        }
        Tools.appendChilds(scoreBoard, title(), container(), counter());
        return scoreBoard;
    }

    Tools.appendChilds(burgerMenu, header(), mainTitle(), scoreBoard());
    return burgerMenu;
})();

const DynamicNode = (() => {
    const playerScore = (name, number) => {
        let playerScore = Tools.createNode('div', 'game-page__burger__score-board__player-score');
        const playerName = () => {
            let playerName = Tools.createNode('div', 'game-page__burger__score-board__player-score__name');
            const span = () => {
                return Tools.setUpSpan(name);
            }
            Tools.appendChilds(playerName, span());
            return playerName;
        }
        const score = () => {
            let score = Tools.createNode('div', 'game-page__burger__score-board__player-score__score');
            const span = () => {
                return Tools.setUpSpan(number);
            }
            Tools.appendChilds(score, span());
            return score;
        }
        Tools.appendChilds(playerScore, playerName(), score());
        return playerScore;
    }
    return { playerScore };
})();

const addPlayScore = () => {
    let players = stateGamePage.getPlayers();
    for (let player of players) {
        let playScore = DynamicNode.playerScore(player.getName(), player.getScore());
        GamePage.BurgerMenu.scoresContainer.appendChild(playScore);
    }
}

export { BurgerMenu, DynamicNode, addPlayScore }