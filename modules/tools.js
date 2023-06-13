const Tools = (() => {
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
    return { createNode, appendChilds, setUpSpan };
})();

export { Tools }