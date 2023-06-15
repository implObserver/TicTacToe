import { Animations } from './animations.js';
import { GamePage } from '../selectors/gamePage.js';

const AnimationsPresets = (() => {
    const ForGamePage = (() => {
        const ForBurgerMenu = (() => {
            const open = (duration) => {
                BurgerMenu.resize(duration, 'none', [{ width: '9vh' }, { width: '45vh' }]);
                BurgerMenu.CloseButton.transition('0vh', '36vh', duration);

                BurgerMenu.MainTitle.opacity('0', '1', duration);
                BurgerMenu.ScoreBoard.opacity('0', '1', duration);
                BurgerMenu.CloseButton.LinesInButton.Middle.opacity('1', '0', duration, 'forwards');

                BurgerMenu.CloseButton.LinesInButton.Up.transition('0vh', '1.3vh', duration / 2).finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Up.rotate(0, -45, duration / 2, 'forwards')
                });
                BurgerMenu.CloseButton.LinesInButton.Down.transition('0vh', '-1.3vh', duration / 2).finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Down.rotate(0, 45, duration / 2, 'forwards')
                });

                BurgerMenu.CloseButton.background('#663399', '#E94141', duration, 'forwards');
            }

            const close = (duration) => {
                BurgerMenu.CloseButton.transition('36vh', '0vh', duration);

                BurgerMenu.MainTitle.opacity('1', '0', duration);
                BurgerMenu.ScoreBoard.opacity('1', '0', duration);
                BurgerMenu.CloseButton.LinesInButton.Middle.opacity('0', '1', duration, 'forwards');

                BurgerMenu.CloseButton.LinesInButton.Up.rotate(-45, 0, duration / 2, 'forwards').finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Up.transition('1.3vh', '0vh', duration / 2);
                });
                BurgerMenu.CloseButton.LinesInButton.Down.rotate(45, 0, duration / 2, 'forwards').finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Down.transition('-1.3vh', '0vh', duration / 2);
                });

                BurgerMenu.CloseButton.background('#E94141', '#663399', duration);

                return BurgerMenu.resize(duration, 'none', [{ width: '45vh' }, { width: '9vh' }]);
            }
            return { open, close };
        })();
        return { ForBurgerMenu };
    })();
    return { ForGamePage };
})();

const BurgerMenu = (() => {
    const resize = (dur, fill, ...keyFrames) => {
        return Animations.custom(GamePage.BurgerMenu.opened, dur, fill, ...keyFrames);
    };

    const CloseButton = (() => {
        let closeButton = GamePage.BurgerMenu.closeButton;
        const transition = (x0, x1, dur, fill = 'none') => {
            return Animations.transform.x(closeButton, x0, x1, dur, fill);
        };

        const LinesInButton = (() => {
            const Up = (() => {
                let ln = closeButton.querySelector('.up');
                const transition = (y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(ln, y0, y1, dur, fill);
                }
                const rotate = (rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(ln, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();

            const Middle = (() => {
                let ln = closeButton.querySelector('.middle');
                const opacity = (op0, op1, dur, fill = 'none') => {
                    return Animations.opacity(ln, op0, op1, dur, fill);
                }
                return { opacity };
            })();

            const Down = (() => {
                let ln = closeButton.querySelector('.down');
                const transition = (y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(ln, y0, y1, dur, fill);
                }
                const rotate = (rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(ln, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();
            return { Up, Middle, Down };
        })();

        const background = (color0, color1, dur, fill = 'none') => {
            return Animations.background(closeButton, color0, color1, dur, fill);
        }

        return { transition, LinesInButton, background };
    })();

    const MainTitle = (() => {
        const opacity = (op0, op1, dur, fill = 'none') => {
            return Animations.opacity(GamePage.BurgerMenu.mainTitle, op0, op1, dur, fill);
        }
        return { opacity };
    })();

    const ScoreBoard = (() => {
        const opacity = (op0, op1, dur, fill = 'none') => {
            return Animations.opacity(GamePage.BurgerMenu.scoreBoard, op0, op1, dur, fill);
        }
        return { opacity };
    })();

    return { resize, CloseButton, MainTitle, ScoreBoard };
})();

const GameBoard = (() => {
    const cell = (() => {
        const opacity = (cell,op0, op1, dur, fill = 'none') => {
            return Animations.opacity(cell, op0, op1, dur, fill);
        }
        return { opacity };
    })();
    return { cell };
})();

export { AnimationsPresets, GameBoard };