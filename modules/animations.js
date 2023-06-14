import { Selectors } from './selectors.js';

const Animations = (() => {
    const transform = (() => {
        const x = (e, x0, x1, dur, dir = 'normal', fill = 'none') => {
            e.animate([{ transform: `translateX(${x0})` }, { transform: `translateX(${x1})` }], { duration: dur, direction: dir });
        }

        const y = (e, y0, y1, dur, dir) => {
            e.animate([{ transform: `translateY(${y0})` }, { transform: `translateY(${y1})` }], { duration: dur, direction: dir, fill: fill });
        }

        const rotate = (e, rotate1, rotate2, dur, dir = 'normal', fill = 'none') => {
            e.animate([{ transform: `rotate(${rotate1}deg)` }, { transform: `rotate(${rotate2}deg)` }], { duration: dur, direction: dir, fill: fill });
        }

        return { x, y, rotate };
    })();

    const background = (e, color1, color2, dur, dir = 'normal', fill = 'none') => {
        e.animate([{ background: color1 }, { background: color2 }], { duration: dur, direction: dir, fill: fill });
    };

    const opacity = (e, opacity1, opacity2, dur, dir = 'normal', fill = 'none') => {
        e.animate([{ opacity: opacity1 }, { opacity: opacity2 }], { duration: dur, direction: dir, fill: fill });
    };

    const custom = (e, dur, dir = 'normal', fill = 'none', ...keyFrames) => {
        e.animate(...keyFrames, { duration: dur, direction: dir, fill: fill });
    };

    return { transform, background, opacity, custom };
})();

const AnimationsPreset = (() => {
    const gamePage = (() => {
        const burgerMenu = (() => {
            const open = () => {
                gpAnimations.burgerMenu.open();
                gpAnimations.closeButton.transition();
                gpAnimations.mainTitle.opacity();
                gpAnimations.scoreBoard.opacity();
                gpAnimations.closeButton.line.up().finished.then(() => {
                    gpAnimations.closeButton.line.rotate('.up', 0, -45);
                });
                gpAnimations.closeButton.line.middle();
                gpAnimations.closeButton.line.down().finished.then(() => {
                    gpAnimations.closeButton.line.rotate('.down', 0, 45);
                });
                gpAnimations.closeButton.background();
            }

            const close = () => {
                gpAnimations.closeButton.transition('reverse');
                gpAnimations.mainTitle.opacity('reverse');
                gpAnimations.scoreBoard.opacity('reverse');
                gpAnimations.closeButton.line.rotate('.up', -45, 0).finished.then(() => {
                    gpAnimations.closeButton.line.up('reverse');
                });
                gpAnimations.closeButton.line.middle('reverse');
                gpAnimations.closeButton.line.rotate('.down', 45, 0).finished.then(() => {
                    gpAnimations.closeButton.line.down('reverse');
                });
                gpAnimations.closeButton.background('reverse');
                return gpAnimations.burgerMenu.open('reverse');
            }
            return { open, close };
        })();
        return { burgerMenu };
    })();
    return { gamePage };
})();

const gpAnimations = (() => {
    const burgerMenu = (() => {
        const open = (param = 'normal', fill = 'none') => {
            return Selectors.gpOpenedBurger.animate([{ width: '9vh' }, { width: '45vh' }], { duration: 500, direction: param });
        };
        return { open };
    })();

    const closeButton = (() => {
        const transition = (param = 'normal') => {
            Selectors.gpCloseButton.animate([{ left: '0vh' }, { left: '36vh' }], { duration: 500, direction: param });
        };

        const line = (() => {
            const up = (param = 'normal') => {
                let ln = Selectors.gpCloseButton.querySelector('.up');
                return ln.animate([{ top: '0vh' }, { top: '1.3vh' }], { duration: 250, direction: param });
            };

            const middle = (param = 'normal') => {
                Selectors.gpCloseButton.querySelector('.middle').animate([{ opacity: '1' }, { opacity: '0' }], { duration: 250, fill: 'forwards', direction: param });
            };

            const down = (param = 'normal') => {
                let ln = Selectors.gpCloseButton.querySelector('.down');
                return ln.animate([{ top: '0vh' }, { top: '-1.3vh' }], { duration: 250, direction: param });
            };

            const rotate = (selector, rotate1, rotate2, param = 'normal') => {
                return Selectors.gpCloseButton.querySelector(selector).animate([{ transform: `rotate(${rotate1}deg)` }, { transform: `rotate(${rotate2}deg)` }], { duration: 250, fill: 'forwards', direction: param });
            }
            return { up, middle, down, rotate };
        })();

        const background = (param = 'normal') => {
            Selectors.gpCloseButton.animate([{ background: '#663399' }, { background: '#E94141' }], { duration: 500, fill: 'forwards', direction: param });
        }

        return { transition, line, background };
    })();

    const mainTitle = (() => {
        const opacity = (param = 'normal') => {
            Selectors.gpMainTitle.animate([{ opacity: '0' }, { opacity: '1' }], { duration: 500, direction: param });
        }
        return { opacity };
    })();

    const scoreBoard = (() => {
        const opacity = (param = 'normal') => {
            Selectors.gpScoreBoard.animate([{ opacity: '0' }, { opacity: '1' }], { duration: 500, direction: param });
        }
        return { opacity };
    })();

    return { scoreBoard, closeButton, burgerMenu, mainTitle };
})();

export { gpAnimations, AnimationsPreset };