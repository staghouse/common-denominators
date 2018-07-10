const { tests, data } = require('./cases');
const Benchmark = require('benchmark');
const readline = require('readline');
const chalk = require('chalk');
const suite = new Benchmark.Suite();
const env = require('dotenv');
const log = console.log;

const average = process.env.AVERAGE || 3; // Amount to run each test
const benchmark = 0.1; // Percent to compare against
let results = [];
let cycles = 0;
let ops = 0;

// For each data test
for (let test of data) {
    // and each set of functions
    for (let type of tests) {
        // and each function
        for (let fn of type.fns) {
            // iterate 3 times
            for (let i = 1; i <= average; i++) {
                suite.add(`${type.name}: ${test.name}`, () => {
                    fn(...test.data);
                });
            }
        }
    }
}

suite
    .on('start', () => {
        log(chalk.bold.bgBlue.white(' Starting benchmarks... \n'));
    })
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
                    'Running... ',
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
                    ).toLocaleString()} ops/sec average (${average} Pass${
                        average > 1 ? 'es' : ''
                    })\n`
                )
            );

            cycles = 0;
            ops = 0;
        }

        if (
            results.length === tests[0].fns.length * tests.length &&
            cycles === 0
        )
            log();

        if (cycles === 0) process.stdout.write(chalk.gray('Continuing...'));
    })
    .on('complete', () => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        log();

        for (let i = 1; i < tests.length; i++) {
            log(chalk.bold(`${tests[i].name} benchmarks:`));

            data.map((d, index) => {
                const work = parseInt(results[index * tests.length]);
                const current = parseInt(results[index * tests.length + i]);
                const currentDiff = parseInt(work - current);
                const currentMin = parseInt(current * benchmark);
                const currentDiffBetter = currentDiff > currentMin;
                const currentDiffWorse = currentDiff < 0 - currentMin;
                const currentDiffComparable =
                    !currentDiffBetter && !currentDiffWorse;
                const currentDiffMsg = `${parseInt(
                    (currentDiff / current) * 100
                )}%`;

                process.stdout.write(
                    currentDiffBetter
                        ? chalk.bold.bgGreen.white(' PASS ')
                        : currentDiffWorse
                            ? chalk.bold.bgRed.white(' FAIL ')
                            : currentDiffComparable
                                ? chalk.bold.bgWhite.black(' COMP ')
                                : chalk.bold.bgYellow.white(' WARN ')
                );
                process.stdout.write(` ${currentDiffMsg} delta `);
                process.stdout.write(chalk.dim(`(${d.name}) \n`));
            });

            log();
        }

        log(chalk.gray(`Ran all benchmarks.`));
    })
    .run({ async: true });
