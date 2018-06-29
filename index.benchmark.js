const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const commonDenominators = require('./index');

let testCase = [];

for (let i = 0; i < 10000; i++) {
    testCase.push(Math.floor(Math.random() * 10000));
}

suite
    .add('commonDenominators', function() {
        commonDenominators(...testCase);
    })
    .on('cycle', function(event) {
        console.info('\x1b[33m%s\x1b[0m', String(event.target));
    })
    .run({ async: true });
