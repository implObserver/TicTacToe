import { MainPage } from '../selectors/mainPage.js';
import { AnimationsPresets } from '../animations/mainPage.js';

const Listeners = () => {
    const mpPlay = MainPage.play.addEventListener('click', e => {
        console.log(document);
        AnimationsPresets.ForMainPage.ForButtonPlay.open(500);
    });

    return { mpPlay };
};

export { Listeners };