import { GamePage } from '../../models/selectors/gamePageSelectors.js';
import { UniversalAnimations } from '../../views/animations/gamePage.js';
import { Tools } from '../../helper/tools.js';
import { close, open } from '../../models/gamePageModels/burgerMenuModel.js';
import { Player, Profiles } from '../../models/gamePageModels/playerModel.js';
import { addPlayer } from '../../models/gamePageModels/playerCardModel.js';
import { BeforeStartPlay, AfterStartPlay, Session, AfterEndPlay } from '../../models/gamePageModels/states.js';
import { NodeGameBoard, GameBoard, MoveHandler, winlineBar, MobilePageOptions } from '../../models/gamePageModels/gameBoardModel.js';
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
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.applouseRound.popup, 1, 0, 200, 'forwards');
        GameHandler.move.newRound('startRound');
    });

    const closePopupDraw = GamePage.Popups.draw.popup.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.draw.popup, 1, 0, 200, 'forwards');
        GameHandler.move.newRound('startRound');
    });

    const closePopupGameOver = GamePage.Popups.gameOver.popup.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.gameOver.popup, 1, 0, 200, 'forwards');
        Session.endSession();
        AfterEndPlay();
    });

    const openPopupAddPlayer = GamePage.Body.templateCard.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.addPlayer.popup, 0, 1, 200, 'forwards');
    });

    const closePopupAddPlayer = GamePage.Body.closePopup.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.popup, 1, 0, 200, 'forwards');
    });

    const addPlayerCard = GamePage.Popups.addPlayer.popup.addEventListener('submit', e => {
        e.preventDefault();
        let name = document.querySelector('.nickname');
        addPlayer(name.value);
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.popup, 1, 0, 200, 'forwards');
    });

    const mobileExit = MobilePageOptions.addEventListener('click', e => {
        if (confirm('Are you sure you want to exit game?')) {
            Session.endSession();
            AfterEndPlay();
        } else {

        }
    });

    const mobileStartPlay = GamePage.Body.playMobile.addEventListener('click', e => {

        if (Session.getPlayers().length < 2) {
            alert('Добавьте минимум 2 игроков');
        } else {
            AfterStartPlay('mobile');
            GameHandler.play();
        }

    });



};

const AddListener = (() => {
    const cell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            cell.getNode().style.pointerEvents = 'none';
            let node = cell.getNode();
            let idMove = Session.getid();
            let player = Session.getPlayer(idMove);
            let idMarker = player.getId();
            let marker = Profiles.getMarker(idMarker);

            node.appendChild(marker);
            let x = cell.getX();
            let y = cell.getY();

            cell.fill();
            GameBoard.getGameBoard()[y][x] = idMarker;

            Tools.removeChilds(node);
            node.appendChild(marker);
            let isWinnable = MoveHandler.checkWinnable(x, y, idMarker);
            GamePage.Body.gameBoard.style.pointerEvents = 'none';
            setTimeout(() => {
                GamePage.Body.gameBoard.style.pointerEvents = 'auto';
                if (isWinnable) {
                    GameHandler.move.winnableMoveInit();
                } else {
                    GameHandler.move.nextMove();
                }
            }, 650);
        });
    }

    const optionalCell = (cell) => {
        cell.getNode().addEventListener('click', e => {
            winlineBar.setting(cell.getX());
            MoveHandler.setWinLine(cell.getX() + 1);
        });
    }

    const mobileDeleteCard = (card, player) => {
        card.querySelector('.delete').addEventListener('click', e => {
            GamePage.Body.playerCards.removeChild(card);
            Session.returnId(player.getId());
            Session.deletePlayer(player);
            if (Session.getPlayers().length < 4) {
                GamePage.Body.templateCard.style.display = 'grid';
            }
        });
    }

    const deleteCard = (card, player) => {
        card.querySelector('.marker').addEventListener('click', e => {
            if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
                GamePage.Body.playerCards.removeChild(card);
                Session.returnId(player.getId());
                Session.deletePlayer(player);
                if (Session.getPlayers().length < 4) {
                    GamePage.Body.templateCard.style.display = 'grid';
                }
            }
        });
    }

    return { cell, optionalCell, mobileDeleteCard, deleteCard };
})();

const viewPage = () => {
    const Settings = (() => {
        const DefaultPresets = (() => {
            const GameBoardPreset = (() => {
                GameBoard.setWidth(3);
                GameBoard.setHeigth(3);
                GameBoard.setOverAllSize(38);
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