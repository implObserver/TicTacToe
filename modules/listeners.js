import { Selectors } from './selectors.js';
import { AnimationsPreset, gpAnimations } from './animations.js';

const Listeners = (() => {
    const gpBurgerOpen = Selectors.gpOpenButton.addEventListener('click', e => {
        Selectors.gpWrapper.replaceChild(Selectors.gpOpenedBurger, Selectors.gpClosedBurger);
        AnimationsPreset.gamePage.burgerMenu.open(400);
    });

    const gpBurgerClose = Selectors.gpCloseButton.addEventListener('click', e => {
        AnimationsPreset.gamePage.burgerMenu.close(400).finished.then(() => {
            Selectors.gpWrapper.replaceChild(Selectors.gpClosedBurger, Selectors.gpOpenedBurger);
        });
    });

    return { gpBurgerOpen, gpBurgerClose };
})();

export { Listeners };