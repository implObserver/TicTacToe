import { GamePage } from '../../models/selectors/gamePageSelectors.js';
import { AnimationsPresets } from '../../views/animations/gamePage.js';
import { Templates } from '../../views/images/markers/markers.js';
import { Tools } from '../../helper/tools.js';
import { DynamicNode } from '../../models/gamePageModels/burgerMenuModel.js';
import { Player } from '../../models/gamePageModels/playerModel.js';
import { addPlayer } from '../../models/gamePageModels/playerCardModel.js';
import { gamePage as stateGamePage, BeforeStartPlay, AfterStartPlay } from '../../models/gamePageModels/states.js';
import { NodeGameBoard, GameBoard, MoveHundler, winlineBar } from '../../models/gamePageModels/gameBoardModel.js';

const DefaultListeners = () => {
    const burgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        GamePage.BurgerMenu.opened.style.overflow = 'hidden';
        GamePage.Wrapper.replaceChild(GamePage.BurgerMenu.opened, GamePage.BurgerMenu.closed);
        AnimationsPresets.ForGamePage.ForBurgerMenu.open(300).finished.then(e => {
            GamePage.BurgerMenu.opened.style.overflow = 'visible';
        });
    });

    const burgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        GamePage.BurgerMenu.opened.style.overflow = 'hidden';
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

    const startPlay = GamePage.Body.play.addEventListener('click', e => {
        if (stateGamePage.getPlayers().length < 2) {
            alert('Добавьте минимум 2 игроков');
        } else {
            AfterStartPlay();
        }
    })
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

const Settings = (() => {
    const DefaultPresets = (() => {
        const GameBoardPreset = (() => {
            GameBoard.setWidth(3);
            GameBoard.setHeigth(3);
            MoveHundler.setWinLine(3);
        })();
        return { GameBoardPreset };
    })();
    return { DefaultPresets };
})();

const DrawPage = (() => {
    NodeGameBoard.draw();
    winlineBar.fill();
    winlineBar.setting(2);
    BeforeStartPlay();
})();

export { DefaultListeners, AddListener, Settings };