import { Animations } from "./animations.js";
import { GamePage } from "../../models/selectors/gamePageSelectors.js";

const BurgerMenu = (() => {
    const resize = (dur, fill, ...keyFrames) => {
        return Animations.custom(GamePage.BurgerMenu.opened, dur, fill, ...keyFrames);
    }

    const CloseButton = (() => {
        const transition = (e, x0, x1, dur, fill = 'none') => {
            return Animations.transform.x(e, x0, x1, dur, fill);
        }

        const LinesInButton = (() => {
            const Up = (() => {
                const transition = (e, y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(e, y0, y1, dur, fill);
                }
                const rotate = (e, rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(e, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();

            const Middle = (() => {
                const opacity = (e, op0, op1, dur, fill = 'none') => {
                    return Animations.opacity(e, op0, op1, dur, fill);
                }
                return { opacity };
            })();

            const Down = (() => {
                const transition = (e, y0, y1, dur, fill = 'none') => {
                    return Animations.transform.y(e, y0, y1, dur, fill);
                }
                const rotate = (e, rotate1, rotate2, dur, fill = 'none') => {
                    return Animations.transform.rotate(e, rotate1, rotate2, dur, fill);
                }
                return { transition, rotate };
            })();
            return { Up, Middle, Down };
        })();

        const background = (e, color0, color1, dur, fill = 'none') => {
            return Animations.background(e, color0, color1, dur, fill);
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
        const opacity = (cell, op0, op1, dur, fill = 'none') => {
            return Animations.opacity(cell, op0, op1, dur, fill);
        }
        return { opacity };
    })();
    return { cell };
})();
//timer.querySelector('.front-timer').animate([{ stroke: 'green' }, { stroke: 'orange' }, { stroke: 'red' }], { duration: 36000 });
const Markers = (() => {
    const cross = (() => {
        const draw = (e, dur, fill, ...keyFrames) => {
            Animations.custom(e.firstChild, dur, fill, ...keyFrames);
            setTimeout(() => {
                Animations.custom(e.lastChild, dur, fill, ...keyFrames);
            }, dur)
            return Animations.custom(e, dur, fill, ...keyFrames);
        }
        return { draw };
    })();

    const circle = (() => {
        const draw = (e, dur, fill, ...keyFrames) => {
            return Animations.custom(e, dur, fill, ...keyFrames);
        }
        return { draw };
    })();

    return { cross, circle };
})();

const Timer = (() => {
    const colorIndicator = (() => {
        const colors = (e, dur, fill, ...keyFrames) => {
            return Animations.custom(e, dur, fill, ...keyFrames);
        }

        const draw = (e, dur, fill, ...keyFrames) => {
            return Animations.custom(e, dur, fill, ...keyFrames);
        }
        return { colors, draw };
    })();
    return { colorIndicator };
})();

const AnimationsPresets = (() => {
    const ForGamePage = (() => {
        const ForBurgerMenu = (() => {
            const open = (duration) => {
                let closeButton = GamePage.BurgerMenu.closeButton;
                BurgerMenu.resize(duration, 'none', [{ width: '9vh' }, { width: '45vh' }]);
                BurgerMenu.CloseButton.transition(closeButton, '0vh', '36vh', duration);

                BurgerMenu.MainTitle.opacity('0', '1', duration);
                BurgerMenu.ScoreBoard.opacity('0', '1', duration);
                BurgerMenu.CloseButton.LinesInButton.Middle.opacity(closeButton.querySelector('.middle'), '1', '0', duration, 'forwards');

                BurgerMenu.CloseButton.LinesInButton.Up.transition(closeButton.querySelector('.up'), '0vh', '1.3vh', duration / 2).finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Up.rotate(closeButton.querySelector('.up'), 0, -45, duration / 2, 'forwards')
                });
                BurgerMenu.CloseButton.LinesInButton.Down.transition(closeButton.querySelector('.down'), '0vh', '-1.3vh', duration / 2).finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Down.rotate(closeButton.querySelector('.down'), 0, 45, duration / 2, 'forwards')
                });

                return BurgerMenu.CloseButton.background(closeButton, '#663399', '#E94141', duration, 'forwards');
            }

            const close = (duration) => {
                let closeButton = GamePage.BurgerMenu.closeButton;
                BurgerMenu.CloseButton.transition(closeButton, '36vh', '0vh', duration);

                BurgerMenu.MainTitle.opacity('1', '0', duration);
                BurgerMenu.ScoreBoard.opacity('1', '0', duration);
                BurgerMenu.CloseButton.LinesInButton.Middle.opacity(closeButton.querySelector('.middle'), '0', '1', duration, 'forwards');

                BurgerMenu.CloseButton.LinesInButton.Up.rotate(closeButton.querySelector('.up'), -45, 0, duration / 2, 'forwards').finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Up.transition(closeButton.querySelector('.up'), '1.3vh', '0vh', duration / 2);
                });
                BurgerMenu.CloseButton.LinesInButton.Down.rotate(closeButton.querySelector('.down'), 45, 0, duration / 2, 'forwards').finished.then(() => {
                    BurgerMenu.CloseButton.LinesInButton.Down.transition(closeButton.querySelector('.down'), '-1.3vh', '0vh', duration / 2);
                });

                BurgerMenu.CloseButton.background(closeButton, '#E94141', '#663399', duration);

                return BurgerMenu.resize(duration, 'none', [{ width: '45vh' }, { width: '9vh' }]);
            }
            return { open, close };
        })();

        const ForMarkers = (() => {
            const addCircle = (circle) => {
                return Markers.circle.draw(circle, 600, 'none', [{ strokeDashoffset: '188.4%' }, { strokeDashoffset: '0' }]);
            }

            const addCross = (cross) => {
                return Markers.cross.draw(cross, 600, 'none', [{ strokeDashoffset: '188.4%' }, { strokeDashoffset: '0' }]);
            }
            return { addCircle, addCross };
        })();

        const ForTimer = (() => {
            const colorIndicator = (timer) => {
                return Timer.colorIndicator.colors(timer.lastChild, 36000, 'none', [{ stroke: 'green' }, { stroke: 'orange' }, { stroke: 'red' }]);
            }

            const drawIndicator = (timer) => {
                return Timer.colorIndicator.draw(timer.lastChild, 36000, 'none', [{ strokeDashoffset: '188.4%' }, { strokeDashoffset: '0' }]);
            }
            return { drawIndicator, colorIndicator };
        })();
        return { ForBurgerMenu, ForMarkers, ForTimer };
    })();
    return { ForGamePage };
})();

export { AnimationsPresets, GameBoard, Markers, Timer };