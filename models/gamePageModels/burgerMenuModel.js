import { Tools } from "../../helper/tools.js";
import { Session, gamePage as stateGamePage } from "./states.js";
import { GamePage } from "../selectors/gamePageSelectors.js";
import { AnimationsPresets } from "../../views/animations/gamePage.js";
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
            let counter = Tools.createNode('div', 'game-page__burger__score-board__round-counter');
            const gameExit = () => {
                return Tools.createNode('div', 'icon-wrapper', 'game-exit');
            }
            Tools.appendChilds(counter, Tools.setUpSpan(''), gameExit());
            return counter;
        }
        Tools.appendChilds(scoreBoard, title(), container(), counter());
        return scoreBoard;
    }

    Tools.appendChilds(burgerMenu, header(), mainTitle(), scoreBoard());
    return burgerMenu;
})();

const BurgerMenuClosed = (() => {
    let burgerMenu = Tools.createNode('div', 'game-page__burger--closed');
    const opening = () => {
        let opening = Tools.createNode('div', 'icon-wrapper', 'game-page__burger__button--open');
        let spanUp = Tools.createNode('span', 'up');
        let spanMiddle = Tools.createNode('span', 'middle');
        let spanDown = Tools.createNode('span', 'down');
        Tools.appendChilds(opening, spanUp, spanMiddle, spanDown);
        return opening;
    }
    burgerMenu.appendChild(opening());
    return burgerMenu
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
    Tools.removeChilds(GamePage.BurgerMenu.scoresContainer);
    let players = Session.getPlayers();
    for (let player of players) {
        let playScore = DynamicNode.playerScore(player.getName(), player.getScore());
        GamePage.BurgerMenu.scoresContainer.appendChild(playScore);
    }
}

const close = () => {
    GamePage.BurgerMenu.opened.style.overflow = 'hidden';
    AnimationsPresets.ForGamePage.ForBurgerMenu.close(300).finished.then(() => {
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.closed, GamePage.BurgerMenu.opened);
    });
    document.querySelector('.mobile-timer').style.visible = 'hidden';
    document.querySelector('.mobile-timer').style.opacity = '0';
    GamePage.Body.timer.style.visibility = 'visible';
    GamePage.Body.timer.style.opacity = '1';
    GamePage.Body.displayTimer.style.visibility = 'visible';
    GamePage.Body.displayTimer.style.opacity = '1';
}

const open = () => {
    GamePage.BurgerMenu.opened.style.overflow = 'hidden';
    GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
    AnimationsPresets.ForGamePage.ForBurgerMenu.open(300).finished.then(e => {
        GamePage.BurgerMenu.opened.style.overflow = 'visible';
    });
    GamePage.Body.timer.style.visibility = 'hidden';
    GamePage.Body.timer.style.opacity = '0';
    GamePage.Body.displayTimer.style.visibility = 'hidden';
    GamePage.Body.displayTimer.style.opacity = '0';
    document.querySelector('.mobile-timer').style.visibility = 'visible';
    document.querySelector('.mobile-timer').style.opacity = '1';
}

export { BurgerMenu, BurgerMenuClosed, DynamicNode, addPlayScore, close, open }