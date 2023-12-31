import { Animations } from './animations.js';
import { MainPage } from '../selectors/mainPage.js';

const AnimationsPresets = (() => {
    const ForMainPage = (() => {
        const ForButtonPlay = (() => {
            const open = (duration) => {
               
            }
            return { open };
        })();
        return { ForButtonPlay };
    })();
    return { ForMainPage };
})();

const ButtonPlay = (() => {
    const LinkToGamePage = (() => {
        const resize = (dur, fill, ...keyFrames) => {
            return Animations.custom(MainPage.linkToGamePage, dur, fill, ...keyFrames);
        };
        return { resize };
    })();
    return { LinkToGamePage };
})();

export { AnimationsPresets };