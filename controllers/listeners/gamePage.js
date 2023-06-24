import { GamePage } from '../../models/selectors/gamePageSelectors.js';
import { AnimationsPresets } from '../../views/animations/gamePage.js';
import { Templates } from '../../views/images/markers/markers.js';
import { Tools } from '../../helper/tools.js';
import { BurgerMenu, DynamicNode, close, open } from '../../models/gamePageModels/burgerMenuModel.js';
import { Player, Profiles } from '../../models/gamePageModels/playerModel.js';
import { addPlayer } from '../../models/gamePageModels/playerCardModel.js';
import { gamePage as stateGamePage, BeforeStartPlay, AfterStartPlay, Session, AfterEndPlay } from '../../models/gamePageModels/states.js';
import { NodeGameBoard, GameBoard, MoveHandler, winlineBar } from '../../models/gamePageModels/gameBoardModel.js';
import { GameHandler } from '../../models/gamePageModels/gameHandlerModels.js';
const DefaultListeners = () => {

    const burgerOpen = GamePage.BurgerMenu.openButton.addEventListener('click', e => {
        open();
    });

    const burgerClose = GamePage.BurgerMenu.closeButton.addEventListener('click', e => {
        close();
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

    const exitGame = GamePage.BurgerMenu.exitGame.addEventListener('click', e => {
        close();
        setTimeout(() => {
            Session.endSession();
            AfterEndPlay();
        }, 400);
    });

    const closePopupApplouseRound = GamePage.Popups.applouseRound.popup.addEventListener('click', e => {
        GamePage.Popups.applouseRound.popup.style.opacity = 0;
        GamePage.Popups.applouseRound.popup.style.visibility = 'hidden';
        GameHandler.move.newRound('startRound');
    });

    const closePopupDraw = GamePage.Popups.draw.popup.addEventListener('click', e => {
        GamePage.Popups.draw.popup.style.opacity = 0;
        GamePage.Popups.draw.popup.style.visibility = 'hidden';
        GameHandler.move.newRound('startRound');
    });

    const closePopupGameOver = GamePage.Popups.gameOver.popup.addEventListener('click', e => {
        GamePage.Popups.gameOver.popup.style.opacity = 0;
        GamePage.Popups.gameOver.popup.style.visibility = 'hidden';
        Session.endSession();
        AfterEndPlay();
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
        GamePage.Popups.addPlayer.popup.style.visibility = 'hidden';
        GamePage.Popups.addPlayer.popup.style.opacity = 0;
    });

    const mobileStartPlay = GamePage.Body.playMobile.addEventListener('click', e => {
        if (window.matchMedia('(max-aspect-ratio:1/1.0001)').matches) {
            if (Session.getPlayers().length < 2) {
                alert('Добавьте минимум 2 игроков');
            } else {
                AfterStartPlay('mobile');
                GameHandler.play();
            }
        }
    });

    const startPlay = GamePage.Body.play.addEventListener('click', e => {
        if (Session.getPlayers().length < 2) {
            alert('Добавьте минимум 2 игроков');
        } else {
            AfterStartPlay();
            GameHandler.play();
        }
    })
};

const AddListener = (() => {
    const cell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            cell.getNode().style.pointerEvents = 'none';
            let node = cell.getNode();
            let idPlayer = Session.getid();
            let marker = Profiles.getMarker(idPlayer);
            let x = cell.getX();
            let y = cell.getY();

            cell.fill();
            GameBoard.getGameBoard()[y][x] = idPlayer;

            Tools.removeChilds(node);
            node.appendChild(marker);
            let isWinnable = MoveHandler.checkWinnable(x, y, idPlayer);
            if (isWinnable) {
                GameHandler.move.winnableMoveInit();
            } else {
                GameHandler.move.nextMove();

            }
        });
    }

    const optionalCell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            winlineBar.setting(cell.getX());
            MoveHandler.setWinLine(cell.getX() + 1);
        });
    }

    return { cell, optionalCell };
})();

const viewPage = () => {
    const Settings = (() => {
        const DefaultPresets = (() => {
            const GameBoardPreset = (() => {
                GameBoard.setWidth(3);
                GameBoard.setHeigth(3);
                GameBoard.setOverAllSize(40);
                MoveHandler.setWinLine(3);
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

    return { Settings, DrawPage };
}

export { DefaultListeners, AddListener, viewPage };