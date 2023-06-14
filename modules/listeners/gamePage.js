import { GamePage } from '../selectors/gamePage.js';
import { AnimationsPresets } from '../animations/gamePage.js';

const Listeners = (() => {
    const gpBurgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
        AnimationsPresets.ForGamePage.ForBurgerMenu.open(400);
    });

    const gpBurgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        AnimationsPresets.ForGamePage.ForBurgerMenu.close(400).finished.then(() => {
            GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.closed, GamePage.BurgerMenu.opened);
        });
    });
    
    return { gpBurgerOpen, gpBurgerClose };
})();

export { Listeners };