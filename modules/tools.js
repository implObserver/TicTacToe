const Tools = (() => {
    const location = () => {
        let location = window.location.href.split('/');
        return location[location.length - 1].replace('html', 'js');
    }
    const createNode = (nodeName, ...className) => {
        let node = document.createElement(nodeName);
        addClasses(node, ...className);
        return node;
    }

    const appendChilds = (node, ...childs) => {
        for (let child of childs) {
            node.appendChild(child);
        }
    }

    const addClasses = (node, ...classes) => {
        for (let curClass of classes) {
            node.classList.add(curClass);
        }
    }

    const setUpSpan = (text) => {
        let span = createNode('span');
        span.textContent = text;
        return span;
    }

    const setAttributes = (e, atrs) => {
        for (let atr of atrs) {
            e.setAttribute(atr.name, atr.val);
        }
    }

    const removeChilds = (node) => {
        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }

    const Queue = (length) => {
        let prototype = [];
        const add = (e) => {
            if (prototype.length === length) {
                prototype.shift()
            }
            prototype.push(e);
        }

        const shift = () => {
            prototype.shift();
        }

        return Object.assign(prototype, { add });
    }

    return { Queue, setAttributes, createNode, appendChilds, setUpSpan, location, removeChilds };
})();

export { Tools }