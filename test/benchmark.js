const chalk = require('chalk');
const log = console.log;
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const fns = [
    {
        name: 'Working',
        fn: require('../src/index.min'),
    },
    {
        name: 'Stable',
        fn: require('../build/index.min'),
    },
];

const tests = {
    'Few Numbers': require('./cases/few'),
    'Many Numbers': require('./cases/many'),
};

const average = 3; // Amount to run each test
const benchmark = 0.1; // Percent to compare against
let results = [];
let suites = 0;
let cycles = 0;
let ops = 0;

for (let fn of fns) {
    for (let test in tests) {
        for (let i = 1; i <= average; i++) {
            suite.add(`${fn.name}: ${test}`, () => {
                fn.fn(...tests[test]);
            });
        }
    }
}

suite
    .on('cycle', event => {
        ops += Math.floor(event.target.hz);
        cycles++;

        log(chalk.gray(String(event.target), `[${cycles} of ${average}]`));

        if (cycles === average) {
            results.push(Math.floor(ops / average));

            log(
                chalk.bold.yellow(
                    `${event.target.name} x ${Math.floor(
                        ops / average
                    ).toLocaleString()} ops/sec (average)`
                )
            );

            if (suites <= fns.length) {
                suites++;
                log('Continuing...\n');
            } else {
                log('');
            }

            cycles = 0;
            ops = 0;
        }
    })
    .on('start', () => {
        log(chalk.bold.bgBlue.white(' Starting benchmark tests... \n'));
    })
    .on('complete', () => {
        const total = Object.keys(tests).length;

        fns.reduce((counter, fn) => {
            const work = parseInt(results[counter]);
            const stable = parseInt(results[counter + total]);
            const diff = parseInt(work - stable);
            const min = parseInt(stable * benchmark);
            const better = diff > min;
            const worse = diff < 0 - min;
            const comparable = !better && !worse;
            const msg = ` ${parseInt(
                (diff / stable) * 100
            )}% ${fns[0].name.toUpperCase()} DELTA: ${
                Object.keys(tests)[counter]
            } `;

            log(
                better
                    ? chalk.bold.bgGreen.white(msg)
                    : worse
                        ? chalk.bold.bgRed.white(msg)
                        : comparable
                            ? chalk.bold.bgWhite.black(msg)
                            : chalk.bold.bgYellow.black('UNKNOWN RESULT')
            );

            return counter + 1;
        }, 0);

        log(chalk.gray(`\nRan all benchmark tests.`));
    })
    .run({ async: true });
