# common-denominators

A JS function that takes any number of arguments and returns an array of all the common denominators of any numbers supplied

## The Challenge

Write your own `commonDenominators` function inside of `src/index.js`. Run the `validate` command to test and benchmark your code against the stable. If all tests pass and the benchmark improves over the stable then PR!

## Install

with NPM

```javascript
npm install common-denonimators
```

or with Yarn

```javascript
yarn add common-denonimators
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

Run all tests

```node
npm run test
```

Run all benchmarks

```node
npm run benchmark
```

Build production

```node
npm run build:prod
```
