import { Marker, Templates } from "../../views/images/markers/markers.js";
const Player = () => {
    let name, score, id, marker;

    const setId = (val) => {
        id = val;
    }

    const getId = () => {
        return id;
    }

    const getMarker = () => {
        return marker;
    }

    const setMarker = (val) => {
        marker = val;
    }

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
    return { setId, getId, setMarker, getMarker, setName, getName, setScore, getScore };
}

const Profiles = (() => {
    const colors = ['red', 'blue', '#ffc400', '#c51bdb'];

    const getMarker = (id) => {
        return id === 0 ? Marker.getMarker(Templates.getCross(), [])
            : id === 1 ? Marker.getMarker(Templates.getCircle(), [])
                : id === 2 ? Marker.getMarker(Templates.getCross(), [{ name: 'stroke', val: '#ffc400' }])
                    : Marker.getMarker(Templates.getCircle(), [{ name: 'stroke', val: '#c51bdb' }]);
    }

    const getColor = (id) => {
        return colors[id];
    }

    return { getMarker, getColor };
})();

export { Player, Profiles }