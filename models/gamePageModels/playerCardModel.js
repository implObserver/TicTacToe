import { Tools } from "../../helper/tools.js";
import { GamePage } from "../selectors/gamePageSelectors.js";
import { gamePage as stateGamePage } from "./states.js";
import { Profiles } from "./playerModel.js";

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

        const marker = () => {
            return Tools.createNode('div', 'icon-wrapper', 'marker');
        }

        Tools.appendChilds(playerCard, name(), marker());
        return playerCard;
    }
    return { playerCard };
})();

const addPlayer = (player, name) => {
    if (stateGamePage.getPlayers().length === 3) {
        GamePage.Body.templateCard.style.display = 'none';
    }

    player.setName(name);
    player.setId(stateGamePage.getPlayers().length);
    player.setScore(0);

    stateGamePage.addPlayer(player);

    let card = addCard(player.getId(), name);
    GamePage.Body.playerCards.appendChild(card);
}

const addCard = (id, name) => {
    let card = DynamicNode.playerCard();
    card.querySelector('.name').style.backgroundColor = Profiles.getColor(id);
    card.querySelector('span').textContent = name;
    card.querySelector('.marker').appendChild(Profiles.getMarker(id));
    return card;
}

export { DynamicNode, addPlayer };