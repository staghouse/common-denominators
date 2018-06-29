# common-denominators

A JS function that takes any number of arguments and returns an array of all the common denominators of any numbers supplied

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

Build/Minify and Test source (and Benchmark on success)

```node
npm run validate
```

Run all Tests

```node
npm run test
```

Run all Benchmarks

```node
npm run benchmark
```

Build/Minify stable (Replace stable with working)

```node
npm run build
```
