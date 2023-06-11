import { Selectors } from './selectors.js';
import { DomElements, DynamicDomElements } from './domElements.js';
import { Tools } from './tools.js';

const Listeners = (() => {
    const menuOpen = Selectors.iconMenu.addEventListener('click', e => {
        let burgerMenu = DomElements.burgerMenu;
        Tools.addClasses(burgerMenu, 'checked', 'visible-on');
        Selectors.wrapper.replaceChild(burgerMenu, Selectors.menu);
        burgerMenu.animate([{width: '6vh'},{ width: '40vh' }], {duration: 100});
    });

    const menuClose = Selectors.burgerMenuCloser.addEventListener('click', e => {
        let burgerMenu = DomElements.burgerMenu;
        let menu = Selectors.menu;
        burgerMenu.animate([{width: '40vh'},{ width: '2vh' }], {duration: 100}).finished.then(() => {
            Selectors.wrapper.replaceChild(menu, DomElements.burgerMenu);
        });
        
    });

    return { menuOpen, menuClose };
})();

export { Listeners };