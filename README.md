# common-denominators

![Node CI](https://github.com/staghouse/common-denominators/workflows/Node%20CI/badge.svg)
![codecov](https://codecov.io/gh/staghouse/common-denominators/branch/master/graph/badge.svg)

A JS function that takes any number of arguments and returns an array of all the common denominators of any numbers supplied

## The Challenge

Write your own `commonDenominators` function inside of `src/index.js`. Run the `validate` command to test and benchmark your code against the stable. If all tests pass and the benchmark improves over the stable then PR!

## Install local dev dependencies

```
npm install
```

## Usage

```javascript
const commonDenominators = require('common-denominators');

commonDenominators(6, 12, 24, 30); // -> [1, 2, 3, 6]
```

## Development

Minify, test and benchmark (if tests pass) stable and working

```node
npm run validate
```

Run just units tests

```node
npm run test
```

Run just benchmarks

```node
npm run benchmark
```

Build production

```node
npm run build:prod
```
