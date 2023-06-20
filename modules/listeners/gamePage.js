import { GamePage } from '../selectors/gamePage.js';
import { AnimationsPresets } from '../animations/gamePage.js';
import { NodeGameBoard, GameBoard, MoveHundler, winlineBar, addPlayer } from '../controllers/gamePage.js';
import { Templates } from '../svg/markers/markers.js';
import { Tools } from '../tools.js';
import { DynamicNodes } from '../nodes/gamePage.js';
import { Player } from '../controllers/players/profiles.js';

const DefaultListeners = () => {
    const burgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
        AnimationsPresets.ForGamePage.ForBurgerMenu.open(300);
    });

    const burgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        AnimationsPresets.ForGamePage.ForBurgerMenu.close(300).finished.then(() => {
            GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.closed, GamePage.BurgerMenu.opened);
        });
    });

    const changeWidthGameBoard = GamePage.Body.widthRange.addEventListener('input', () => {
        let width = GamePage.Body.widthRange.value;
        GameBoard.setWidth(width);
        NodeGameBoard.draw();
    });

    const changeHeigthGameBoard = GamePage.Body.heightRange.addEventListener('input', () => {
        let height = GamePage.Body.heightRange.value;
        GameBoard.setHeigth(height);
        NodeGameBoard.draw();
    });

    const openPopupAddPlayer = GamePage.Body.templateCard.addEventListener('click', e => {
        GamePage.Popups.addPlayer.popup.style.opacity = 1;
        GamePage.Popups.addPlayer.popup.style.visibility = 'visible';
    });

    const closePopupAddPlayer = GamePage.Body.closePopup.addEventListener('click', e => {
        GamePage.Popups.addPlayer.popup.style.opacity = 0;
        GamePage.Popups.addPlayer.popup.style.visibility = 'hidden';
    });

    const addPlayerCard = GamePage.Popups.addPlayer.popup.addEventListener('submit', e => {
        e.preventDefault();
        let name = document.querySelector('.nickname');
        addPlayer(Player(), name.value);
        GamePage.Popups.addPlayer.popup.style.opacity = 0;
        GamePage.Popups.addPlayer.popup.style.visibility = 'hidden';
    });
};

const AddListener = (() => {
    const cell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            let node = cell.getNode();
            console.log(`${cell.getX()} ${cell.getY()}`);
            let x = cell.getX();
            let y = cell.getY();

            GameBoard.getGameBoard()[y][x] = 'red';
            console.log(MoveHundler.checkWinnable(x, y, 'red'));

            let circle = Templates.getCircle();
            console.log(circle)
            Tools.removeChilds(node);
            node.appendChild(circle);
        })
    }

    const optionalCell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            winlineBar.setting(cell.getX());
            MoveHundler.setWinLine(cell.getX() + 1);
        });
    }

    return { cell, optionalCell };
})();

export { DefaultListeners, AddListener };