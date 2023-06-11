const Tools = (() => {
    const createNode = (nodeName, className) => {
        let node = document.createElement(nodeName);
        addClasses(node, className);
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
    return { createNode, appendChilds, addClasses };
})();

export {Tools};