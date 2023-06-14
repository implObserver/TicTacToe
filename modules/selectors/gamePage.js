import { BurgerMenu as BM } from "../dom/gamePage.js";

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
        console.log(openButton);
        const closeButton = BM.querySelector('.game-page__burger__button--close');
        const scoresContainer = BM.querySelector('.game-page__burger__score-board__container');
        return { closed, opened, openButton, closeButton, mainTitle, scoreBoard, scoresContainer };
    })();

    const Body = (() => {
        const gameBoard = document.querySelector('.game-page__gameboard');
        return { gameBoard };
    })();

    return { Wrapper, BurgerMenu, Body };
})();

export { GamePage };