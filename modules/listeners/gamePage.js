import { GamePage } from '../selectors/gamePage.js';
import { AnimationsPresets } from '../animations/gamePage.js';

const Listeners = () => {
    const gpBurgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
        AnimationsPresets.ForGamePage.ForBurgerMenu.open(600);
    });

    const gpBurgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        AnimationsPresets.ForGamePage.ForBurgerMenu.close(600).finished.then(() => {
            GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.closed, GamePage.BurgerMenu.opened);
        });
    });

    {
        for (let line of GamePage.GameBoard.Cells) {
            for (let cell of line) {
                cell.addEventListener('click', e => {
                    let i = GamePage.GameBoard.Cells.indexOf(line);
                    let j = line.indexOf(cell);
                    console.log(`${i} ${j}`);
                })
            }
        }
    }


    return { gpBurgerOpen, gpBurgerClose };
};

export { Listeners };