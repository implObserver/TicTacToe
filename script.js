import { Tools } from './helper/tools.js';
import { Listeners as mainPageListeners } from './controllers/listeners/mainPage.js';
import { DefaultListeners as gamePageDefaultListeners, viewPage } from './controllers/listeners/gamePage.js';
import { Loader } from './views/animations/pageLoader.js';
import { DBOpenReq } from './models/indexDB.js';

if (Tools.location().indexOf('gamePage.js') === 0) {
    gamePageDefaultListeners();
    viewPage();
}

if (Tools.location().indexOf('mainPage.js') === 0) {

}