import { GamePage } from '../../models/selectors/gamePageSelectors.js';
import { UniversalAnimations } from '../../views/animations/gamePage.js';
import { Tools } from '../../helper/tools.js';
import { close, open } from '../../models/gamePageModels/burgerMenuModels.js';
import { Player, Profiles } from '../../models/gamePageModels/playersModels.js';
import { AddAi, addPlayer } from '../../models/gamePageModels/playerCardModel.js';
import { BeforeStartPlay, AfterStartPlay, Session, AfterEndPlay } from '../../models/gamePageModels/states.js';
import { NodeGameBoard, GameBoard, MoveHandler, winlineBar, MobilePageOptions, AudioEffects } from '../../models/gamePageModels/gameBoardModels.js';
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
        let height = GameBoard.getHeigth();
        GameBoard.setWidth(width);
        NodeGameBoard.draw();
        let line = Math.max(width, height);
        if (winlineBar.getLength() > line) {
            winlineBar.setting(line - 1);
            winlineBar.setLength(line);
            MoveHandler.setWinLine(line);
        }
    });

    const changeHeigthGameBoard = GamePage.Body.heightRange.addEventListener('input', () => {
        let height = GamePage.Body.heightRange.value;
        let width = GameBoard.getWidth();
        GameBoard.setHeigth(height);
        NodeGameBoard.draw();
        let line = Math.max(width, height);
        if (winlineBar.getLength() > line) {
            winlineBar.setting(line - 1);
            winlineBar.setLength(line);
            MoveHandler.setWinLine(line);
        }
    });

    const exitGame = GamePage.BurgerMenu.exitGame.addEventListener('click', e => {
        close();
        setTimeout(() => {
            Session.endSession();
            AfterEndPlay();
        }, 400);
    });

    const choisHuman = GamePage.Popups.addPlayer.human.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.choisPlayer, 1, 0, 200, 'forwards');
        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.addPlayer.form, 0, 1, 200, 'forwards');
    });

    const addAi = GamePage.Popups.addPlayer.ai.addEventListener('click', e => {
        if (GameBoard.getWidth() > 3 || GameBoard.getHeigth() > 3) {
            alert('AI:ЭТО ПОЛЕ СЛИШКОМ БОЛЬШОЕ ДЛЯ МЕНЯ"');
        } else {
            AddAi.addTerminator();
            UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.popup, 1, 0, 200, 'forwards');
            UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.form, 1, 0, 200, 'forwards');
            UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.choisPlayer, 1, 0, 200, 'forwards');
            GamePage.Body.rangers.style.opacity = 0.2;
            GamePage.Body.rangers.style.pointerEvents = 'none';
            GamePage.Popups.addPlayer.ai.style.opacity = 0.2;
            GamePage.Popups.addPlayer.ai.style.pointerEvents = 'none';
        }
    });

    const closePopupApplouseRound = GamePage.Popups.applouseRound.popup.addEventListener('click', e => {
        AudioEffects.winRound.pause();
        AudioEffects.winRound.currentTime = 0;
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.applouseRound.popup, 1, 0, 200, 'forwards');
        GameHandler.move.newRound('startRound');
    });

    const closePopupDraw = GamePage.Popups.draw.popup.addEventListener('click', e => {
        AudioEffects.draw.pause();
        AudioEffects.draw.currentTime = 0;
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.draw.popup, 1, 0, 200, 'forwards');
        GameHandler.move.newRound('startRound');
    });

    const closePopLose = GamePage.Popups.lose.popup.addEventListener('click', e => {
        AudioEffects.lose.pause();
        AudioEffects.lose.currentTime = 0;
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.lose.popup, 1, 0, 200, 'forwards');
        GameHandler.move.newRound('startRound');
    });

    const closePopupGameOver = GamePage.Popups.gameOver.popup.addEventListener('click', e => {
        AudioEffects.win.pause();
        AudioEffects.win.currentTime = 0;
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.gameOver.popup, 1, 0, 200, 'forwards');
        Session.endSession();
        AfterEndPlay();
    });

    const closePopupGameOverAi = GamePage.Popups.gameOverAi.popup.addEventListener('click', e => {
        AudioEffects.gameOverAi.pause();
        AudioEffects.gameOverAi.currentTime = 0;
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.gameOverAi.popup, 1, 0, 200, 'forwards');
        Session.endSession();
        AfterEndPlay();
    });

    const openPopupAddPlayer = GamePage.Body.templateCard.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.addPlayer.popup, 0, 1, 200, 'forwards');
        UniversalAnimations.SmoothVisibility.open(GamePage.Popups.addPlayer.choisPlayer, 0, 1, 200, 'forwards');
    });

    const closeFormAddPlayer = GamePage.Body.closePopup.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.form, 1, 0, 200, 'forwards');
        setTimeout(() => {
            UniversalAnimations.SmoothVisibility.open(GamePage.Popups.addPlayer.choisPlayer, 0, 1, 200, 'forwards');
        }, 100);
    });

    const closePopupChoisPlayer = GamePage.Popups.addPlayer.closeChoisePlayer.addEventListener('click', e => {
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.choisPlayer, 1, 0, 200, 'forwards');
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.popup, 1, 0, 200, 'forwards');
    });

    const addPlayerCard = GamePage.Popups.addPlayer.popup.addEventListener('submit', e => {
        e.preventDefault();
        let name = document.querySelector('.nickname');
        addPlayer(name.value);
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.form, 1, 0, 200, 'forwards');
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.popup, 1, 0, 200, 'forwards');
        UniversalAnimations.SmoothVisibility.close(GamePage.Popups.addPlayer.choisPlayer, 1, 0, 200, 'forwards');
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
            alert('ДОБАВЬТЕ МИНИМУМ ДВУХ ИГРОКОВ');
        } else {
            AudioEffects.addPlayer.play();
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
            let marker = player.getMarker();
            Profiles.playbackMarkerAudio(idMarker);
            let x = cell.getX();
            let y = cell.getY();

            cell.fill();
            GameBoard.setGameBoardVal(x, y, idMarker);

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
            let line = cell.getX() + 1;
            if (GameBoard.getHeigth() < line && GameBoard.getWidth() < line) {
                alert('ПОЛЕ СЛИШКОМ МАЛЕНЬКОЕ!');
            } else {
                AudioEffects.choisWinLine.play();
                winlineBar.setting(cell.getX());
                winlineBar.setLength(line);
                MoveHandler.setWinLine(line);
            }
        });
    }

    const mobileDeleteCard = (card, player) => {
        card.querySelector('.delete').addEventListener('click', e => {
            AudioEffects.deletePlayer.play();
            GamePage.Body.playerCards.removeChild(card);
            if (player.getId() !== 'terminator') {
                Session.returnId(player.getId());
            }
            Session.deletePlayer(player);
            if (Session.getPlayers().length < 4) {
                GamePage.Body.templateCard.style.display = 'grid';
            }
        });
    }

    const deleteCard = (card, player) => {
        card.querySelector('.marker').addEventListener('click', e => {
            if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
                AudioEffects.deletePlayer.play();
                GamePage.Body.playerCards.removeChild(card);
                if (Number.isInteger(player.getId())) {
                    Session.returnId(player.getId());
                }
                Session.deletePlayer(player);
                if (Session.getPlayers().length < 4) {
                    GamePage.Body.templateCard.style.display = 'grid';
                }
            }
        });
    }

    const removeTerminator = (terminator) => {
        terminator.addEventListener('click', e => {
            GamePage.Body.rangers.style.opacity = 1;
            GamePage.Body.rangers.style.pointerEvents = 'auto';
            GamePage.Popups.addPlayer.ai.style.opacity = 1;
            GamePage.Popups.addPlayer.ai.style.pointerEvents = 'auto';
        });
    }

    return { removeTerminator, cell, optionalCell, mobileDeleteCard, deleteCard };
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