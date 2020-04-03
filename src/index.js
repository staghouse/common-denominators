/**
 * @param {...any} args Only valid Int types will pass through the function completely
 *
 * @note Try to write code as readable as possible, the build tools will optimize accordingly
 * @note `sort` is much slower than `reverse` when working with small dats sets
 *       whie providing little to no gain for larger data sets
 * @note `filter` is faster than a `for` loop when working with large data sets
 *       while providing little gain for smaller data sets.
 * @note Remember to account for small and large numbers and data sets. Validate often.
 * @note The goal here is to write friendly code, pass tests and make a holistically faster function.
 *       Benchmarks can vary from 0-10% deltas at any given test so aim for higher than 10% deltas.
 *       Remember that benchmarks should be tested and retested and retested....
 *
 * @return {Array}
 */

const commonDenominators = (...args) => {
  // Collect and validate all arguments as numerators
  const numerators = args.filter(numerator => {
    return Number.isInteger(numerator) && numerator > 0;
  });

  // If there is no numerators to work with return an empty array
  if (numerators.length === 0) {
    return [];
  }

  // Find the greatest common denominator (smallest numerator)
  // and the second great common denominator possible, respectively
  const denominators = [Math.min(...numerators)];
  const median = denominators[0] / 2;

  // If median denominator is less than 1 it means 1 is a numerator and we can return early
  if (median < 1) {
    return [1];
  }

  // Find all possible denominators against the second greatest common denominator
  let possibleDenominator = Math.ceil(median);
  while (possibleDenominator > 0) {
    if (denominators[0] % possibleDenominator === 0) {
      denominators.push(possibleDenominator);
    }

    possibleDenominator--;
  }
  // Our while loop is optimized but reverses the numbers
  // Optimiation Opportunity: Get rid of reverse
  denominators.reverse();

  // Conlude we only have one numerator so return everything we found
  if (numerators.length === 1) {
    return [...denominators];
  }

  // Conclude that we need to check against more than 1 numerator
  numerators
    // We already iterated on the first numerator
    .splice(1, numerators.length - 1)
    // Iterate against the rest of numerators
    .map(numerator => {
      let possibleDenominator = denominators.length - 1;

      while (possibleDenominator >= 0) {
        // If the numerator can have a common denominator, store it
        if (numerator % denominators[possibleDenominator] !== 0) {
          denominators.splice(possibleDenominator, 1);
        }

        possibleDenominator--;
      }
    });

  // Return all the collected denominators
  return denominators;
};

module.exports = commonDenominators;
