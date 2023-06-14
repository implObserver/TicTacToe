import { Selectors } from './selectors.js';

const Animations = (() => {
    const transform = (() => {
        const x = (e, x0, x1, dur, fill = 'none') => {
            return e.animate([{ left: `${x0}` }, { left: `${x1}` }], { duration: dur, fill: fill });
        }

        const y = (e, y0, y1, dur, fill = 'none') => {
            return e.animate([{ top: `${y0}` }, { top: `${y1}` }], { duration: dur, fill: fill });
        }

        const rotate = (e, rotate1, rotate2, dur, fill = 'none') => {
            return e.animate([{ transform: `rotate(${rotate1}deg)` }, { transform: `rotate(${rotate2}deg)` }], { duration: dur, fill: fill });
        }

        return { x, y, rotate };
    })();

    const background = (e, color1, color2, dur, fill = 'none') => {
        return e.animate([{ background: color1 }, { background: color2 }], { duration: dur, fill: fill });
    };

    const opacity = (e, opacity1, opacity2, dur, fill = 'none') => {
        return e.animate([{ opacity: opacity1 }, { opacity: opacity2 }], { duration: dur, fill: fill });
    };

    const custom = (e, dur, fill = 'none', ...keyFrames) => {
        return e.animate(...keyFrames, { duration: dur, fill: fill });
    };

    return { transform, background, opacity, custom };
})();

const AnimationsPreset = (() => {
    const gamePage = (() => {
        const burgerMenu = (() => {
            const open = (duration) => {
                gpAnimations.burgerMenu.resize(duration, 'none', [{ width: '9vh' }, { width: '45vh' }]);
                gpAnimations.closeButton.transition('0vh', '36vh', duration);

                gpAnimations.mainTitle.opacity('0', '1', duration);
                gpAnimations.scoreBoard.opacity('0', '1', duration);
                gpAnimations.closeButton.linesInButton.middle.opacity('1', '0', duration, 'forwards');

                gpAnimations.closeButton.linesInButton.up.transition('0vh', '1.3vh', duration / 2).finished.then(() => {
                    gpAnimations.closeButton.linesInButton.up.rotate(0, -45, duration / 2, 'forwards')
                });
                gpAnimations.closeButton.linesInButton.down.transition('0vh', '-1.3vh', duration / 2).finished.then(() => {
                    gpAnimations.closeButton.linesInButton.down.rotate(0, 45, duration / 2, 'forwards')
                });

                gpAnimations.closeButton.background('#663399', '#E94141', duration, 'forwards');
            }

            const close = (duration) => {
                gpAnimations.closeButton.transition('36vh', '0vh', duration);
                gpAnimations.mainTitle.opacity('1', '0', duration);
                gpAnimations.scoreBoard.opacity('1', '0', duration);
                gpAnimations.closeButton.linesInButton.middle.opacity('0', '1', duration, 'forwards');
                gpAnimations.closeButton.linesInButton.up.rotate(-45, 0, duration / 2, 'forwards').finished.then(() => {
                    gpAnimations.closeButton.linesInButton.up.transition('1.3vh', '0vh', duration / 2);
                });
                gpAnimations.closeButton.linesInButton.down.rotate(45, 0, duration / 2, 'forwards').finished.then(() => {
                    gpAnimations.closeButton.linesInButton.down.transition('-1.3vh', '0vh', duration / 2);
                });
                gpAnimations.closeButton.background('#E94141', '#663399', duration);
                return gpAnimations.burgerMenu.resize(duration, 'none', [{ width: '45vh' }, { width: '9vh' }]);
            }
            return { open, close };
        })();
        return { burgerMenu };
    })();
    return { gamePage };
})();

const gpAnimations = (() => {
    const burgerMenu = (() => {
        const resize = (dur, fill, ...keyFrames) => {
            return Animations.custom(Selectors.gpOpenedBurger, dur, fill, ...keyFrames);

        };
        return { resize };
    })();

    const closeButton = (() => {
        const transition = (x0, x1, dur, fill = 'none') => {
            return Animations.transform.x(Selectors.gpCloseButton, x0, x1, dur, fill);
        };

        const linesInButton = (() => {
            const up = (() => {
                let ln = Selectors.gpCloseButton.querySelector('.up');
                const transition = (y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(ln, y0, y1, dur, fill);
                }
                const rotate = (rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(ln, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();

            const middle = (() => {
                let ln = Selectors.gpCloseButton.querySelector('.middle');
                const opacity = (op0, op1, dur, fill = 'none') => {
                    return Animations.opacity(ln, op0, op1, dur, fill);
                }
                return { opacity };
            })();

            const down = (() => {
                let ln = Selectors.gpCloseButton.querySelector('.down');
                const transition = (y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(ln, y0, y1, dur, fill);
                }
                const rotate = (rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(ln, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();
            return { up, middle, down };
        })();

        const background = (color0, color1, dur, fill = 'none') => {
            return Animations.background(Selectors.gpCloseButton, color0, color1, dur, fill);
        }

        return { transition, linesInButton, background };
    })();

    const mainTitle = (() => {
        const opacity = (op0, op1, dur, fill = 'none') => {
            return Animations.opacity(Selectors.gpMainTitle, op0, op1, dur, fill);
        }
        return { opacity };
    })();

    const scoreBoard = (() => {
        const opacity = (op0, op1, dur, fill = 'none') => {
            return Animations.opacity(Selectors.gpScoreBoard, op0, op1, dur, fill);
        }
        return { opacity };
    })();


    return { scoreBoard, closeButton, burgerMenu, mainTitle };
})();

export { gpAnimations, AnimationsPreset };