import { Tools } from "../../../helper/tools.js";
import { Attributes } from "./attributes.js";

const Templates = (() => {
    const getCircle = (name = 'move') => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        Tools.addClasses(circle, name);
        svg.appendChild(circle);
        Tools.setAttributes(circle, Attributes.circle);
        return svg;
    }

    const getCross = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let leftLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        let rightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        Tools.setAttributes(leftLine, Attributes.Cross.line.concat(Attributes.Cross.leftDiag));
        Tools.setAttributes(rightLine, Attributes.Cross.line.concat(Attributes.Cross.rightDiag));
        Tools.appendChilds(svg, leftLine, rightLine);
        return svg;
    }

    const getTimer = () => {
        let timer = Marker.getMarker(getCircle('back-timer'), [{ name: 'stroke', val: 'gray' }, { name: 'opacity', val: 0.2 }]);
        let circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        Tools.addClasses(circle2, 'front-timer');
        Tools.setAttributes(circle2, Attributes.circle);
        Tools.setAttributes(circle2, [{ name: 'stroke', val: 'green' }]);
        timer.appendChild(circle2);
        return timer;
    }

    return { getCircle, getCross, getTimer };
})();

const Marker = (() => {
    const getMarker = (template, ...atrs) => {
        let childs = Array.from(template.children);
        for (let child of childs) {
            Tools.setAttributes(child, ...atrs);
        }

        return template;
    }
    return { getMarker };
})();

export { Templates, Marker };