const readline = require('readline');
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

const cases = [
    {
        name: 'Few Numbers',
        data: require('./cases/few'),
    },
    {
        name: 'Many Numbers',
        data: require('./cases/many'),
    },
];

const average = 3; // Amount to run each test
const benchmark = 0.1; // Percent to compare against
let results = [];
let cycles = 0;
let ops = 0;

for (let test of cases) {
    for (let fn of fns) {
        for (let i = 1; i <= average; i++) {
            suite.add(`${fn.name}: ${test.name}`, () => {
                fn.fn(...test.data);
            });
        }
    }
}

suite
    .on('cycle', event => {
        ops += Math.floor(event.target.hz);
        cycles++;

        if (cycles > 0) {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
        }

        if (cycles < average) {
            process.stdout.write(
                chalk.bold.gray(
                    String(event.target),
                    `[${cycles} of ${average}]`
                )
            );
        } else {
            results.push(Math.floor(ops / average));

            process.stdout.write(
                chalk.bold.yellow(
                    `${event.target.name} x ${Math.floor(
                        ops / average
                    ).toLocaleString()} ops/sec average (${average} Tests)\n`
                )
            );

            cycles = 0;
            ops = 0;
        }

        if (cycles === 0) process.stdout.write(chalk.gray('Continuing...'));
    })
    .on('start', () => {
        log(chalk.bold.bgBlue.white(' Starting benchmarks... \n'));
    })
    .on('complete', () => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        log();

        cases.reduce((counter, cs) => {
            const work = parseInt(results[counter * cases.length]);
            const stable = parseInt(results[counter * cases.length + 1]);
            const diff = parseInt(work - stable);
            const min = parseInt(stable * benchmark);
            const better = diff > min;
            const worse = diff < 0 - min;
            const comparable = !better && !worse;
            const msg = ` ${parseInt(
                (diff / stable) * 100
            )}% ${fns[0].name.toUpperCase()} DELTA: ${cases[counter].name} `;

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

        log(chalk.gray(`\nRan all benchmarks.`));
    })
    .run({ async: true });
