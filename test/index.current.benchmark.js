const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const testCase = require('./cases/arrays');
const commonDenominators = require('../src/index.min');

suite
    .add('Working Release', function() {
        commonDenominators(...testCase);
    })
    .on('cycle', function(event) {
        console.info('\x1b[33m%s\x1b[0m', String(event.target));
    })
    .run({ async: true });
