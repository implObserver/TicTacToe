import { Tools } from "../../tools.js";
import { Attributes } from "./attributes.js";

const Markers = (() => {
    const getCircle = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svg.appendChild(circle);
        setAttributes(circle, Attributes.Circle);
        return svg;
    }

    const getCross = () => {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let leftLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        let rightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        setAttributes(leftLine, Attributes.Line.line.concat(Attributes.Line.leftDiag));
        setAttributes(rightLine, Attributes.Line.line.concat(Attributes.Line.rightDiag));
        Tools.appendChilds(svg, leftLine, rightLine);
        return svg;
    }

    const setAttributes = (svg, attributes) => {
        Tools.setAttributes(svg,
            attributes);
    };

    return { getCircle, getCross };
})();

export { Markers };