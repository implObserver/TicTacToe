import { Marker, Templates } from "../../views/images/markers/markers.js";
import { AudioEffects } from "./gameBoardModel.js";
const Player = () => {
    let name, score = 0, id, marker, color;

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

    const setScore = () => {
        ++score;
    }

    const getScore = () => {
        return score;
    }

    const setColor = (val) => {
        color = val;
    }

    const getColor = () => {
        return color;
    }

    const resetScore = () => {
        score = 0;
    }
    return { resetScore, setColor, getColor, setId, getId, setMarker, getMarker, setName, getName, setScore, getScore };
}

const Profiles = (() => {
    const colors = ['red', 'blue', '#ffc400', '#c51bdb'];

    const getMarker = (id) => {
        return id === 0 ? Marker.getMarker(Templates.getCross(), [])
            : id === 1 ? Marker.getMarker(Templates.getCircle(), [])
                : id === 2 ? Marker.getMarker(Templates.getCross(), [{ name: 'stroke', val: '#ffc400' }])
                    : Marker.getMarker(Templates.getCircle(), [{ name: 'stroke', val: '#c51bdb' }]);
    }

    const playbackMarkerAudio = (id) => {
        id === 0 ? AudioEffects.cross.play()
            : id === 1 ? AudioEffects.circle.play()
                : id === 2 ? AudioEffects.cross.play()
                    : AudioEffects.circle.play();
    }

    const getColor = (id) => {
        return colors[id];
    }

    return { getMarker, getColor, playbackMarkerAudio };
})();

export { Player, Profiles }