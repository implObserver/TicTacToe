const Attributes = (() => {

    const circle = [
        { name: 'r', val: '30%' },
        { name: 'cx', val: '50%' },
        { name: 'cy', val: '50%' },
        { name: 'fill', val: 'none' },
        { name: 'stroke', val: 'blue' },
        { name: 'stroke-width', val: '10%' },
        { name: 'stroke-linecap', val: 'round' },
        { name: 'stroke-dasharray', val: '188.4%' },
        { name: 'stroke-dashoffset', val: '188.4%' }
    ]

    const Cross = (() => {
        const line = [
            { name: 'stroke', val: 'red' },
            { name: 'stroke-width', val: '10%' },
            { name: 'stroke-linecap', val: 'round' },
            { name: 'stroke-dasharray', val: '100%' },
            { name: 'stroke-dashoffset', val: '100%' }
        ];
        const leftDiag = [
            { name: 'x1', val: '20%' },
            { name: 'y1', val: '20%' },
            { name: 'x2', val: '80%' },
            { name: 'y2', val: '80%' }
        ];

        const rightDiag = [
            { name: 'x2', val: '20%' },
            { name: 'y2', val: '80%' },
            { name: 'x1', val: '80%' },
            { name: 'y1', val: '20%' }
        ];
        return { line, leftDiag, rightDiag };
    })();
    return { circle, Cross }
})();

export { Attributes };