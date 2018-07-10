module.exports = {
    tests: [
        {
            name: 'Working',
            fns: [require('../../src/index.min')],
        },
        {
            name: 'Stable',
            fns: [require('../../build/index.min')],
        },
        {
            name: 'Control',
            fns: [require('./control/index.min')],
        },
    ],
    data: [
        {
            name: 'Few Numbers',
            data: require('./data/arrayOfFewNumbers'),
        },
        {
            name: 'Many Numbers',
            data: require('./data/arrayOfManyNumbers'),
        },
    ],
};
