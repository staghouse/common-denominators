const commonDenominators = (...args) => {
  const numerators = args.filter(numerator => {
    return Number.isInteger(numerator) && numerator > 0;
  });
  if (numerators.length === 0) {
    return [];
  }
  const denominators = [ Math.min(...numerators) ];
  const median = denominators[0] / 2;
  if (median < 1) {
    return [ 1 ];
  }
  let possibleDenominator = Math.ceil(median);
  while (possibleDenominator > 0) {
    if (denominators[0] % possibleDenominator === 0) {
      denominators.push(possibleDenominator);
    }
    possibleDenominator--;
  }
  denominators.reverse();
  if (numerators.length === 1) {
    return [ ...denominators ];
  }
  numerators.splice(1, numerators.length - 1).map(numerator => {
    let possibleDenominator = denominators.length - 1;
    while (possibleDenominator >= 0) {
      if (numerator % denominators[possibleDenominator] !== 0) {
        denominators.splice(possibleDenominator, 1);
      }
      possibleDenominator--;
    }
  });
  return denominators;
};

module.exports = commonDenominators;