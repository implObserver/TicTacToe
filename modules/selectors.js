import { DomElements } from "./domElements.js";

const Selectors = (() => {
    const iconMenu = document.querySelector('.select');
    const wrapper = document.querySelector('.wrapper');
    const menu = document.querySelector('.menu');
    const burgerMenuCloser = DomElements.burgerMenu.querySelector('.close');
    const container = DomElements.burgerMenu.querySelector('.score__board-container');
    return { iconMenu, wrapper, menu, burgerMenuCloser, container };
})();

export { Selectors };