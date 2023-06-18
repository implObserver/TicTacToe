import { Marker, Templates } from "../../svg/markers/markers.js";

const Player = () => {
    let name, score;

    const setName = (val) => {
        name = val;
    }

    const getName = () => {
        return name;
    }

    const setScore = (val) => {
        score = val;
    }

    const getScore = () => {
        return score;
    }
    return { setName, getName, setScore, getScore };
}

const Player1 = (() => {
    const prototype = Player();
    const id = 1;
    const marker = Marker.getMarker(Templates.getCross(), []);

    const getId = () => {
        return id;
    }

    const getMarker = () => {
        return marker;
    }

    return Object.assign({}, prototype, { getId }, { getMarker });
})();

const Player2 = (() => {
    const prototype = Player();
    const id = 2;
    const marker = Marker.getMarker(Templates.getCircle, []);

    const getId = () => {
        return id;
    }

    const getMarker = () => {
        return marker;
    }

    return Object.assign({}, prototype, { getId }, { getMarker });
})();

const Player3 = (() => {
    const prototype = Player();
    const id = 2;
    const marker = Marker.getMarker(Templates.getCircle(), [{ name: 'stroke', val: 'yellow' }]);

    const getId = () => {
        return id;
    }

    const getMarker = () => {
        return marker;
    }

    return Object.assign({}, prototype, { getId }, { getMarker });
})();

const Player4 = (() => {
    const prototype = Player();
    const id = 2;
    const marker = Marker.getMarker(Templates.getCircle(), [{ name: 'stroke', val: 'green' }]);

    const getId = () => {
        return id;
    }

    const getMarker = () => {
        return marker;
    }

    return Object.assign({}, prototype, { getId }, { getMarker });
})();

export { Player1 }