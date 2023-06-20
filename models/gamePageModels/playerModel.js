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

const Profiles = ((id) => {
    const markers = [
        Marker.getMarker(Templates.getCross(), []),
        Marker.getMarker(Templates.getCircle(), []),
        Marker.getMarker(Templates.getCross(), [{ name: 'stroke', val: 'yellow' }]),
        Marker.getMarker(Templates.getCircle(), [{ name: 'stroke', val: 'green' }])
    ];

    const colors = ['red', 'blue', 'yellow', 'green'];

    const getMarker = (id) => {
        console.log(markers[id])
        return markers[id];
    }

    const getColor = (id) => {
        return colors[id];
    }

    return { getMarker, getColor };
})();

export {Player, Profiles}