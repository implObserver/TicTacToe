import { Tools } from "../../tools.js";
import { Attributes } from "./attributes.js";

const Templates = (() => {
    const getCircle = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
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

    return { getCircle, getCross };
})();

const Marker = (() => {
    const getMarker = (template, ...atrs) => {
        let child = template.firstChild;
        Tools.setAttributes(child, ...atrs);
        return template;
    }
    return { getMarker };
})();

export { Templates, Marker };