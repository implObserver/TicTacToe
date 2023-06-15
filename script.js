import { Tools } from './modules/tools.js';
import { Listeners as mainPageListeners } from './modules/listeners/mainPage.js';
import { Listeners as gamePageListeners } from './modules/listeners/gamePage.js';
import { fillGameBoard } from './modules/controllers/gamePage.js';

if (Tools.location() === 'gamePage.js') {
    fillGameBoard(3, 3);
    gamePageListeners();
}

if (Tools.location() === 'mainPage.js') {
    mainPageListeners();
}