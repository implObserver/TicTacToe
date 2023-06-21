import { GamePage } from "../selectors/gamePageSelectors.js";
import { Templates } from "../../views/images/markers/markers.js";
import { gamePage as stateGamePage } from "./states.js";
import { Tools } from "../../helper/tools.js";
const GameHandler = (() => {
    const play = () => {
        move.nextMove();
    }

    const move = ((id = -1) => {
        let interval;

        const setPlayer = () => {
            let playerQuantity = stateGamePage.getPlayers().length;
            let cards = document.querySelectorAll('.player-card');
            for (let i = 0; i < playerQuantity; i++) {
                if (i != id) {
                    cards[i].style.opacity = '0.2';
                } else {
                    cards[i].style.opacity = '1';
                }
            }
        }

        const addTimer = () => {
            let timer = Templates.getTimer();
            timer.querySelector('.front-timer').animate([{ stroke: 'green' }, { stroke: 'orange' }, { stroke: 'red' }], { duration: 36000 });
            GamePage.Body.timer.appendChild(timer);
            viewSeconds();
        }

        const viewSeconds = () => {
            let seconds = 30;
            interval = setInterval(() => {
                GamePage.Body.timer.querySelector('span').textContent = `0:${seconds}`;
                if (seconds === 0) {
                    nextMove();
                }
                --seconds;
            }, 1000);
        }

        const nextMove = () => {
            clearInterval(interval);
            Tools.removeChilds(GamePage.Body.timer);
            GamePage.Body.timer.appendChild(Tools.setUpSpan('0:30'));
            if (id >= stateGamePage.getPlayers().length - 1) {
                id = 0;
            } else {
                ++id;
            }
            GamePage.Session.setId(id);
            addTimer();
            setPlayer();
        }
        return { nextMove };
    })();

    return { play, move };
})();

export { GameHandler };