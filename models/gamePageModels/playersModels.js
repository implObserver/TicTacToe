import { Marker, Templates } from "../../views/images/markers/markers.js";
import { AudioEffects } from "./gameBoardModels.js";
import { Session } from "./states.js";
const Player = () => {
    let name, score = 0, id, color;
    let markerTemplate;
    let markerAttrs = [];
    let ai = false;

    const setMarketTemplate = (template) => {
        markerTemplate = template;
    }

    const setMarkerAttrs = (attrs) => {
        markerAttrs.push(attrs);
    }

    const getMarker = () => {
        return Marker.getMarker(markerTemplate(), markerAttrs[0]);
    }

    const setId = (val) => {
        id = val;
    }

    const getId = () => {
        return id;
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

    const setAi = () => {
        ai = true;
    }

    const isAi = () => {
        return ai;
    }

    const resetScore = () => {
        score = 0;
    }
    return { setAi, isAi, setMarkerAttrs, setMarketTemplate, resetScore, setColor, getColor, setId, getId, getMarker, setName, getName, setScore, getScore };
}

const Profiles = (() => {
    const colors = ['red', 'blue', '#ffc400', '#c51bdb'];

    const getMarker = (id) => {
        return id === 0 ? [Templates.getCross, []]
            : id === 1 ? [Templates.getCircle, []]
                : id === 2 ? [Templates.getCross, [{ name: 'stroke', val: '#ffc400' }]]
                    : id === 3 ? [Templates.getCircle, [{ name: 'stroke', val: '#c51bdb' }]]
                        : id === 'terminator' ? [Templates.getCross, [{ name: 'stroke', val: '#000000' }]]
                            : id === 'toaster' ? [Templates.getCircle, [{ name: 'stroke', val: '#ffc0cb' }]]
                                : [Templates.getCross, [{ name: 'stroke', val: '#00fff2' }]];
    }

    const playbackMarkerAudio = (id) => {
        id === 0 ? AudioEffects.cross.play()
            : id === 1 ? AudioEffects.circle.play()
                : id === 2 ? AudioEffects.cross.play()
                    : id === 3 ? AudioEffects.circle.play()
                        : id === 'terminator' ? AudioEffects.aiCross.play()
                            : id === 'toaster' ? AudioEffects.circle.play()
                                : AudioEffects.cross.play();

    }

    const getColor = (id) => {
        return colors[id];
    }

    return { getMarker, getColor, playbackMarkerAudio };
})();

const aiProfiles = (() => {
    const terminator = () => {
        let prototype = Player();
        prototype.setAi();
        prototype.setName('Terminator');
        prototype.setId('terminator');
        prototype.setColor('black');
        let marker = Profiles.getMarker('terminator');
        prototype.setMarketTemplate(marker[0]);
        prototype.setMarkerAttrs(marker[1]);
        return prototype;
    }

    return { terminator };
})();

export { Player, Profiles, aiProfiles }