import { Tools } from './modules/tools.js';
import { Listeners as mainPageListeners } from './modules/listeners/mainPage.js';
import { Listeners as gamePageListeners } from './modules/listeners/gamePage.js';
import { fillGameBoard } from './modules/controllers/gamePage.js';

if (Tools.location() === 'gamePage.js') {
    fillGameBoard(6, 6);
    gamePageListeners();
}

if (Tools.location() === 'mainPage.js') {
    mainPageListeners();
}


/*for (let i = 0; i < 2; i++) {
    let score = DynamicDomElements.playerScore();
    GamePage.BurgerMenu.scoresContainer.appendChild(score);
}

let length = 4;
GamePage.Body.gameBoard.style.width = `${(length * 12) + 10}vh`;
GamePage.Body.gameBoard.style.height = `${(length * 12) + 10}vh`;
console.log(GamePage.Body.gameBoard.style.height);
for (let i = 0; i < 36; i++) {
    let cell = DynamicDomElements.cell();
    if (i === 0) {
        cell.style.border = '1px red solid';
    }
    GamePage.Body.gameBoard.appendChild(cell);
}*/