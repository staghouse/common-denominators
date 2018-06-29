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

Run tests (and benchmark on success)

```javascript
npm run validate
```

Run tests only

```javascript
npm run test
```

Run benchmark only

```javascript
npm run benchmark
```
