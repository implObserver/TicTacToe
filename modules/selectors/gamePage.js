import { BurgerMenu as BM } from "../nodes/gamePage.js";

const GamePage = (() => {
    const Wrapper = (() => {
        return document.querySelector('.game-page');
    })();

    const BurgerMenu = (() => {
        const mainTitle = BM.querySelector('.game-page__burger__main-title');
        const scoreBoard = BM.querySelector('.game-page__burger__score-board');
        const closed = document.querySelector('.game-page__burger--closed');
        const opened = BM;
        const openButton = document.querySelector('.game-page__burger__button--open');
        const closeButton = BM.querySelector('.game-page__burger__button--close');
        const scoresContainer = BM.querySelector('.game-page__burger__score-board__container');
        return { closed, opened, openButton, closeButton, mainTitle, scoreBoard, scoresContainer };
    })();

    const Body = (() => {
        const playerCards = document.querySelector('.player-cards');
        const gameBoard = document.querySelector('.game-page__gameboard');
        const heightRange = document.querySelector('.heigth');
        const widthRange = document.querySelector('.width');
        return { gameBoard, heightRange, widthRange, playerCards };
    })();

    return { Wrapper, BurgerMenu, Body };
})();

export { GamePage };