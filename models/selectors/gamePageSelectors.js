import { BurgerMenu as BM } from "../gamePageModels/burgerMenuModel.js";

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
        const roundCounter = BM.querySelector('.game-page__burger__score-board__round-counter');
        return { closed, opened, openButton, closeButton, mainTitle, scoreBoard, scoresContainer, roundCounter };
    })();

    const Body = (() => {
        const itemsWrapper = document.querySelector('.items-wrapper');
        const timer = document.querySelector('.timer');
        const playWrapper = document.querySelector('.play-wrapper');
        const playerCards = document.querySelector('.player-cards');
        const allCards = document.querySelectorAll('.player-card');
        const templateCard = document.querySelector('.template-card');
        const gameBoard = document.querySelector('.game-page__gameboard');
        const rangers = document.querySelector('.rangers');
        const heightRange = document.querySelector('.heigth');
        const widthRange = document.querySelector('.width');
        const winlineBar = document.querySelector('.win-option');
        const closePopup = document.querySelector('.close-popup');
        const play = document.querySelector('.game-page__play');
        const tutorials = document.querySelectorAll('.tutor');
        const root = document.querySelector(':root');
        return { root, allCards, itemsWrapper, timer, playWrapper, templateCard, gameBoard, heightRange, widthRange, playerCards, winlineBar, closePopup, play, tutorials, rangers };
    })();

    const Popups = (() => {
        const addPlayer = (() => {
            const popup = document.querySelector('.popup');
            const form = document.querySelector('.add-player');
            const buttonOK = document.querySelector('.add-player-btn');
            return { popup, buttonOK, form };
        })();

        const applouseRound = (() => {
            const popup = document.querySelector('.popup2');
            const scorePreView = document.querySelector('.round-results');
            return { popup, scorePreView };
        })();
        return { addPlayer, applouseRound };
    })();

    return { Wrapper, BurgerMenu, Body, Popups };
})();

export { GamePage };