import { Tools } from './modules/tools.js';
import { Listeners as mainPageListeners } from './modules/listeners/mainPage.js';
import { DefaultListeners as gamePageDefaultListeners } from './modules/listeners/gamePage.js';
import { NodeGameBoard, GameBoard, winlineBar } from './modules/controllers/gamePage.js';
import { Player } from './modules/controllers/players/profiles.js';
import { Loader } from './modules/animations/pageLoader.js';

if (Tools.location().indexOf('gamePage.js') === 0) {
    NodeGameBoard.draw();
    winlineBar.fill();
    gamePageDefaultListeners();
}

if (Tools.location().indexOf('mainPage.js') === 0) {
    mainPageListeners();
}