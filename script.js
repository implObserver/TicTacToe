import { Tools } from './helper/tools.js';
import { Listeners as mainPageListeners } from './controllers/listeners/mainPage.js';
import { DefaultListeners as gamePageDefaultListeners } from './controllers/listeners/gamePage.js';
import { Loader } from './views/animations/pageLoader.js';

if (Tools.location().indexOf('gamePage.js') === 0) {
    gamePageDefaultListeners();
}