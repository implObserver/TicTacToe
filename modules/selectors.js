import { DomElements } from "./domElements.js";

const Selectors = (() => {
    const gpWrapper = document.querySelector('.game-page');
    const gpClosedBurger = document.querySelector('.game-page__burger--closed');
    const gpOpenedBurger = DomElements.gpBurgerMenu;
    const gpOpenButton = document.querySelector('.game-page__burger__button--open');
    console.log(gpOpenButton);
    const gpCloseButton = DomElements.gpBurgerMenu.querySelector('.game-page__burger__button--close');
    const gpGameBoard = document.querySelector('.game-page__gameboard');
    const gpScoresContainer = DomElements.gpBurgerMenu.querySelector('.game-page__burger__score-board__container');
    return { gpOpenButton, gpCloseButton, gpWrapper, gpClosedBurger, gpOpenedBurger, gpScoresContainer, gpGameBoard };
})();

export { Selectors };