# common-denominators

![Node CI](https://github.com/staghouse/common-denominators/workflows/Node%20CI/badge.svg)
![codecov](https://codecov.io/gh/staghouse/common-denominators/branch/master/graph/badge.svg)
![npm version](https://img.shields.io/npm/v/common-denominators)

A JS function that takes any number of arguments and returns an array of all the common denominators of any numbers supplied

## The Challenge

Write your own `commonDenominators` function inside of `src/index.js`. Run the `validate` command to test and benchmark your code against the stable. If all tests pass and the benchmark improves over the stable then PR!

## Install local dev dependencies

```
npm install
```

## Usage

```js
const commonDenominators = require('common-denominators');

commonDenominators(6, 12, 24, 30); // -> [1, 2, 3, 6]
```

## Development

Minify, test and benchmark

```
npm run validate
```

Run only unit tests

```js
npm run test // test all files once
npm run test:watch // watch and test on source
```

Run only benchmarks

```node
npm run benchmark
```

Build distribution package. Overwrites the current package export. *(This should be the fastest passing version)*

```node
npm run dist
```
