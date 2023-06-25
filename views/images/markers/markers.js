import { Tools } from "../../../helper/tools.js";
import { AnimationsPresets } from "../../animations/gamePage.js";
import { Attributes } from "./attributes.js";

const Templates = (() => {
    const getCircle = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        AnimationsPresets.ForGamePage.ForMarkers.addCircle(circle);
        svg.appendChild(circle);
        Tools.setAttributes(circle, Attributes.circle);
        return svg;
    }

    const getCross = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let leftLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        let rightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        Tools.appendChilds(svg, leftLine, rightLine);
        AnimationsPresets.ForGamePage.ForMarkers.addCross(svg);
        Tools.setAttributes(leftLine, Attributes.Cross.line.concat(Attributes.Cross.leftDiag));
        Tools.setAttributes(rightLine, Attributes.Cross.line.concat(Attributes.Cross.rightDiag));
        return svg;
    }

    const getTimer = () => {
        let timer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        Tools.addClasses(circle2, 'front-timer');

        Tools.setAttributes(circle1, Attributes.circle.concat([{ name: 'stroke-dasharray', val: '0' },
        { name: 'stroke-dashoffset', val: '0' },
        { name: 'stroke', val: 'grey' },
        { name: 'opacity', val: 0.2 }]));

        Tools.setAttributes(circle2, Attributes.circle.concat([{ name: 'stroke', val: 'green' }]));

        Tools.appendChilds(timer, circle1, circle2);
        return timer;
    }

    const getMobileTimer = () => {
        let timer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        Tools.setAttributes(line, Attributes.HorizontalLine.horizontal);
        Tools.appendChilds(timer, line);
        return timer;
    }

    return { getMobileTimer, getCircle, getCross, getTimer };
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