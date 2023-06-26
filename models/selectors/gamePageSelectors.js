import { UniversalAnimations } from "../../views/animations/gamePage.js";
import { BurgerMenu as BM, BurgerMenuClosed as BMC } from "../gamePageModels/burgerMenuModel.js";

const GamePage = (() => {
    const Wrapper = (() => {
        return document.querySelector('.game-page');
    })();

    const BurgerMenu = (() => {
        const mainTitle = BM.querySelector('.game-page__burger__main-title');
        const scoreBoard = BM.querySelector('.game-page__burger__score-board');
        const closed = BMC;
        const opened = BM;
        const openButton = BMC.querySelector('.game-page__burger__button--open');
        const closeButton = BM.querySelector('.game-page__burger__button--close');
        const scoresContainer = BM.querySelector('.game-page__burger__score-board__container');
        const roundCounter = BM.querySelector('.game-page__burger__score-board__round-counter > span');
        const exitGame = BM.querySelector('.game-exit');
        return { exitGame, closed, opened, openButton, closeButton, mainTitle, scoreBoard, scoresContainer, roundCounter };
    })();

    const Body = (() => {
        const body = document.querySelector('.game-page__body');
        const itemsWrapper = document.querySelector('.items-wrapper');
        const timer = document.querySelector('.timer');
        const playWrapper = document.querySelector('.play-wrapper');
        const playerCards = document.querySelector('.player-cards');
        const templateCard = document.querySelector('.template-card');
        const gameBoard = document.querySelector('.game-page__gameboard');
        const rangers = document.querySelector('.rangers');
        const heightRange = document.querySelector('.heigth');
        const widthRange = document.querySelector('.width');
        const winlineBar = document.querySelector('.win-option');
        const closePopup = document.querySelector('.close-popup');
        const play = document.querySelector('.game-page__play');
        const displayTimer = document.querySelector('.timer-display')
        const tutorials = document.querySelectorAll('.tutor');
        const root = document.querySelector(':root');
        const playMobile = document.querySelector('.play-btn__mobile');
        const deletesCard = document.querySelectorAll('.delete');

        const mobileRoundsCounter = () => {
            return document.querySelector('.round-number__mobile');
        }

        const mobileTimer = () => {
            return document.querySelector('.mobile-timer');
        }

        const getAllPlayerCards = () => {
            return document.querySelectorAll('.player-card');
        }

        return {
            deletesCard, body, mobileTimer, mobileRoundsCounter, displayTimer, playMobile, root,
            getAllPlayerCards, itemsWrapper, timer, playWrapper,
            templateCard, gameBoard, heightRange,
            widthRange, playerCards, winlineBar,
            closePopup, play, tutorials, rangers
        };
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
            const roundPreview = document.querySelector('.round-number');
            const scorePreView = document.querySelector('.round-results');
            const roundWinner = document.querySelector('.round-winner');
            return { popup, scorePreView, roundPreview, roundWinner };
        })();

        const gameOver = (() => {
            const popup = document.querySelector('.popup3');
            const winner = document.querySelector('.winner');
            return { popup, winner };
        })();

        const draw = (() => {
            const popup = document.querySelector('.popup4');
            return { popup };
        })();

        return { addPlayer, applouseRound, gameOver, draw };
    })();

    return { Wrapper, BurgerMenu, Body, Popups };
})();

export { GamePage };