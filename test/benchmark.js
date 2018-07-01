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

const average = 3;
const benchmark = 0.05; // Compare within 5%
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

        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        console.log(
            '\033[2m',
            String(event.target),
            `[${cycles} of ${average}]`,
            '\033[0m'
        );

        if (cycles === average) {
            results.push(Math.floor(ops / average));

            console.log(
                '\033[1m\x1b[33m%s\x1b[0m\033[0m',
                `\n${event.target.name} x ${Math.floor(
                    ops / average
                ).toLocaleString()} ops/sec (average)`
            );

            if (suites <= fns.length) {
                suites++;
                console.log('Continuing...\n');
            } else {
                console.log('');
            }

            cycles = 0;
            ops = 0;
        }
    })
    .on('start', () => {
        console.log(
            '\033[1m\x1b[37m\x1b[44m%s\x1b[0m\033[0m',
            ' Starting benchmark tests... \n'
        );
    })
    .on('complete', () => {
        const total = Object.keys(tests).length;

        fns.reduce((counter, fn) => {
            const work = parseInt(results[counter]);
            const stable = parseInt(results[counter + total]);
            const diff = parseInt(work - stable);
            const min = parseInt(stable * benchmark);
            const better = diff > 0 && diff >= min;
            const worse = diff < 0 && Math.abs(diff) <= min;
            const comparable =
                (diff > 0 && diff < min) ||
                (Math.abs(diff) > 0 && Math.abs(diff) < min);

            better === true
                ? console.log(
                      '\033[1m\x1b[37m\x1b[42m%s\x1b[0m\033[0m',
                      ` PASS: ${Object.keys(tests)[counter]} `
                  )
                : comparable === true
                    ? console.log(
                          '\033[1m\x1b[30m\x1b[43m%s\x1b[0m\033[0m',
                          ` COMPARABLE within ${benchmark * 100}%: ${
                              Object.keys(tests)[counter]
                          } `
                      )
                    : worse == true
                        ? console.log(
                              '\033[1m\x1b[37m\x1b[41m%s\x1b[0m\033[0m',
                              ` FAIL: ${Object.keys(tests)[counter]} `
                          )
                        : console.log(
                              '\033[1m\x1b[37m\x1b[41m%s\x1b[0m\033[0m',
                              ` PROBLEM: ${Object.keys(tests)[counter]} `
                          );

            counter++;
            return counter;
        }, 0);

        console.log(
            '\033[1m\x1b[37m\x1b[44m%s\x1b[0m\033[0m',
            '\n Finished all benchmark tests. \n'
        );
    })
    .run({ async: true });
