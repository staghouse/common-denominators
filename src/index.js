/**
 *
 * @param {...any} args Only valid Int types will pass through the function wholly.
 *
 * @note Try to write code as readable as possible, the build tools will optimize accordingly.
 * @note `filter` is interestingly faster than a `for` loop when working with large data sets
 *       while providing little gain for smaller data sets.
 * @note Remember to account for small and large numbers and data sets. Validate often.
 * @note The goal here is to write friendly code, pass tests and make a holistically faster function.
 *       Benchmarks can vary from 0-10% deltas at any given test so aim for higher than 10% deltas.
 *       Remember that benchmarks should be tested and retested and retested....
 *
 * @return {Array}
 */

const commonDenominators = (...args) => {
  // Create a storage for our numerators where we filter over possible numerators
  // from the arguments passed in to the function...
  const numerators = args.filter(numerator => {
    return Number.isInteger(numerator) && numerator > 0;
  });

  // If there is no numerators to work with...
  if (numerators.length === 0) {
    // Return an empty array.
    return [];
  }

  // Store the smallest numerator, this will become the greatest common denominator if needed.
  const denominators = [Math.min(...numerators)];
  // Store half of the greatest common denominator, we can never return a
  // value greater than half of the largest denominator.
  const median = denominators[0] / 2;

  // If median denominator is less than 1 it means 1 is a numerator and we can return early.
  if (median < 1) {
    return [1];
  }

  // Store the medium rounded up. We can use this to check against all
  // numerators for common denominators.
  let commonNumber = Math.ceil(median);
  // Iterate against the common numbers.
  while (commonNumber > 0) {
    // If the current number is a denominator of the greatest common denominator...
    if (denominators[0] % commonNumber === 0) {
      // Store the common denominator for later.
      denominators.push(commonNumber);
    }

    // Reduce the iteration against the numerators maximum value
    commonNumber--;
  }

  // Our while loop is optimized but reversed.
  denominators.reverse();

  // If theres only one numerator then the denominators are "ipso facto" common and...
  if (numerators.length === 1) {
    // We can return first set of denominators we found.
    return [...denominators];
  }

  numerators
    // Because we already did early checks on the first numerator,
    // we can skip the first one to optimize on large data sets.
    .splice(1, numerators.length - 1)
    // For every other numerator...
    .map(numerator => {
      // Store the length of common denominators we already found.
      let denominator = denominators.length - 1;
      // For every denominator...
      while (denominator >= 0) {
        // If the current denominator is a denominator of the current numerator...
        if (numerator % denominators[denominator] !== 0) {
          // We can splice the denominator in to position of our denominators.
          denominators.splice(denominator, 1);
        }

        // Reduce the iteration against the denominators length.
        denominator--;
      }
    });

  // Return all the collected denominators.
  return denominators;
};

module.exports = commonDenominators;
