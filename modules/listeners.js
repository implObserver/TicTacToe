import { Selectors } from './selectors.js';

const Listeners = (() => {
    const gpBurgerOpen = Selectors.gpOpenButton.addEventListener('click', e => {
        Selectors.gpWrapper.replaceChild(Selectors.gpOpenedBurger, Selectors.gpClosedBurger);
        Selectors.gpOpenedBurger.animate([{ width: '6vh' }, { width: '40vh' }], { duration: 100 });
    });

    const gpBurgerClose = Selectors.gpCloseButton.addEventListener('click', e => {
        Selectors.gpOpenedBurger.animate([{ width: '40vh' }, { width: '6vh' }], { duration: 100 }).finished.then(() => {
            Selectors.gpWrapper.replaceChild(Selectors.gpClosedBurger, Selectors.gpOpenedBurger);
        });

    });

    return { gpBurgerOpen, gpBurgerClose };
})();

export { Listeners };