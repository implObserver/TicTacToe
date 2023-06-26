import { Tools } from "../../helper/tools.js";
import { GamePage } from "../selectors/gamePageSelectors.js";
import { Session, gamePage as stateGamePage } from "./states.js";
import { Player, Profiles } from "./playerModel.js";
import { AddListener } from "../../controllers/listeners/gamePage.js";
import { AudioEffects } from "./gameBoardModel.js";

const DynamicNode = (() => {
    const playerCard = () => {
        let playerCard = Tools.createNode('div', 'player-card');
        const name = () => {
            let name = Tools.createNode('div', 'name');
            const span = () => {
                return Tools.setUpSpan('');
            }
            name.appendChild(span());
            return name;
        }

        const markerContainer = () => {
            return Tools.createNode('div', 'icon-wrapper', 'marker');
        }

        const cardOptions = () => {
            let options = Tools.createNode('div', 'card-options');
            const scoreContainer = () => {
                let score = Tools.createNode('div', 'score');
                score.appendChild(Tools.setUpSpan('0'));
                return score;
            }

            const deleteCard = () => {
                return Tools.createNode('div', 'delete');
            }
            Tools.appendChilds(options, scoreContainer(), deleteCard());
            return options;
        }

        Tools.appendChilds(playerCard, name(), markerContainer(), cardOptions());
        return playerCard;
    }
    return { playerCard };
})();

const addPlayer = (name) => {
    if (Session.getPlayers().length === 3) {
        GamePage.Body.templateCard.style.display = 'none';
    }

    let player = createPlayer(name);
    Session.addPlayer(player);

    let card = createCard(player);
    AddListener.mobileDeleteCard(card, player);
    AddListener.deleteCard(card, player);
    AudioEffects.addPlayer.play();
    GamePage.Body.playerCards.appendChild(card);
}

const createPlayer = (name) => {
    let player = Player();
    player.setName(name);
    player.setId(Session.removeId());
    player.setColor(Profiles.getColor(player.getId()));
    player.setMarker(Profiles.getMarker(player.getId()));
    return player;
}

const createCard = (player) => {
    let card = DynamicNode.playerCard();
    card.querySelector('.name').style.backgroundColor = player.getColor();
    card.querySelector('span').textContent = player.getName();
    card.querySelector('.marker').appendChild(player.getMarker());
    return card;
}

const changeOpacityCards = (op) => {
    let cards = GamePage.Body.getAllPlayerCards();
    for (let card of cards) {
        card.style.opacity = op;
    }
}

export { DynamicNode, addPlayer, changeOpacityCards };