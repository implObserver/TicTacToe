import { Selectors } from './selectors.js';
import { DomElements, DynamicDomElements } from './domElements.js';
import { Tools } from './tools.js';

const Listeners = (() => {
    const menuClick = Selectors.iconMenu.addEventListener('click', e => {
        let burgerMenu = DomElements.burgerMenu();
        Tools.addClasses(burgerMenu, 'checked', 'visible-on');
        Selectors.wrapper.replaceChild(burgerMenu, Selectors.menu);
    });

    return { menuClick };
})();

export {Listeners};