import { Tools } from "../../helper/tools.js";
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

export { DynamicNode };