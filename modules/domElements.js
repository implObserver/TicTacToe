import { Tools } from './tools.js';

const DomElements = (() => {
    const burgerMenu = () => {
        let burgerMenu = Tools.createNode('div', 'burger__menu');
        const header = () => {
            let header = Tools.createNode('div', 'burger__menu-header');
            const logo = () => {
                return Tools.createNode('div', 'icon__wrapper');
            }
            const title = () => {
                let title = Tools.createNode('div', 'title');
                title.textContent = 'TicTacToe';
                return title;
            }
            Tools.appendChilds(header, logo(), title());
            return header;
        }
        const scoreBoard = () => {
            let scoreBoard = Tools.createNode('div', 'score__board');
            const title = () => {
                let title = Tools.createNode('div', 'title');
                title.textContent = 'Score Board';
                return title;
            }
            const container = () => {
                return Tools.createNode('div', 'score__board-container');
            }
            const counter = () => {
                return Tools.createNode('div', 'round__counter');
            }
            Tools.appendChilds(scoreBoard, title(), container(), counter());
            return scoreBoard;
        }
        Tools.appendChilds(burgerMenu, header(), scoreBoard());
        return burgerMenu;
    }
    return { burgerMenu };
})()

const DynamicDomElements = () => {
    const playerScore = (name) => {
        let playerScore = Tools.createNode('div', 'player__score');
        const title = () => {
            let title = Tools.createNode('div', 'title');
            title.textContent = name;
            return title;
        }
        const score = () => {
            return Tools.createNode('div', 'score');
        }
        Tools.appendChilds(playerScore, title(), score());
        return playerScore;
    }
    return { playerScore };
}

export {DomElements, DynamicDomElements};