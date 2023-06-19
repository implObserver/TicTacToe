import { Tools } from './modules/tools.js';
import { Listeners as mainPageListeners } from './modules/listeners/mainPage.js';
import { DefaultListeners as gamePageDefaultListeners } from './modules/listeners/gamePage.js';
import { NodeGameBoard, GameBoard, winlineBar } from './modules/controllers/gamePage.js';
import { Player1 } from './modules/controllers/players/profiles.js';
import { Loader } from './modules/animations/pageLoader.js';

if (Tools.location() === 'gamePage.js') {
    NodeGameBoard.draw();
    winlineBar.fill();
    gamePageDefaultListeners();
}

if (Tools.location() === 'mainPage.js') {
    mainPageListeners();
}