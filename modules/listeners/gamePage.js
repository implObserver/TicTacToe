import { GamePage } from '../selectors/gamePage.js';
import { AnimationsPresets } from '../animations/gamePage.js';
import { NodeGameBoard, GameBoard, MoveHundler } from '../controllers/gamePage.js';

const DefaultListeners = () => {
    const gpBurgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
        AnimationsPresets.ForGamePage.ForBurgerMenu.open(300);
    });

    const gpBurgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        AnimationsPresets.ForGamePage.ForBurgerMenu.close(300).finished.then(() => {
            GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.closed, GamePage.BurgerMenu.opened);
        });
    });

    const gpChangeWidthGameBoard = GamePage.Body.widthRange.addEventListener('input', () => {
        let width = GamePage.Body.widthRange.value;
        GameBoard.setWidth(width);
        NodeGameBoard.draw();
    });

    const gpChangeHeigthGameBoard = GamePage.Body.heightRange.addEventListener('input', () => {
        let height = GamePage.Body.heightRange.value;
        GameBoard.setHeigth(height);
        NodeGameBoard.draw();
    });
};

const AddListener = (() => {
    const cell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            console.log(`${cell.getX()} ${cell.getY()}`);
            let x = cell.getX();
            let y = cell.getY();
            cell.getNode().style.background = 'red';
            GameBoard.getGameBoard()[y][x] = 'red';
            console.log(MoveHundler.checkWinnable(x, y, 'red'));
        })
    }

    return { cell };
})();

export { DefaultListeners, AddListener };