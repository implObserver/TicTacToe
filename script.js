import { Tools } from './modules/tools.js';
import { Listeners as mainPageListeners } from './modules/listeners/mainPage.js';
import { DefaultListeners as gamePageDefaultListeners } from './modules/listeners/gamePage.js';
import { NodeGameBoard, GameBoard } from './modules/controllers/gamePage.js';

if (Tools.location() === 'gamePage.js') {
    NodeGameBoard.draw();
    gamePageDefaultListeners();
}

if (Tools.location() === 'mainPage.js') {
    mainPageListeners();
}