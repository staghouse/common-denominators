/**
 *
 * @param {...Any} args Any number of arguments
 * @returns {Array} An array of all common denominators
 */
module.exports = (...args) => {
    // Store all the arguments and filter them to only unqiue, positive numbers
    // Then sort them in from lowest to highest
    const allNumerators = Array.from(
        new Set(
            args.filter(
                numerator => Number.isInteger(numerator) && numerator > 0
            )
        )
    ).sort((numerator, next) => numerator - next);
    // Store the length of our numerators for later
    const numeratorsLength = allNumerators.length - 1;
    // Return the numerators reduced to a new array containing all the denominators
    // of each of the numerators, then sorted lowest to highest, and then filtered
    // to only have values that appears the same amount of times as numerators
    return (
        allNumerators
            .reduce((denominators, numerator, index, numerators) => {
                // Store the first numerator to divide against
                let counter = allNumerators[0];
                while (counter > 0) {
                    // If the numerator can be divided by the first possible denominator and
                    // the first numerator can be divided by the current denominator
                    numerator % counter === 0 && numerators[0] % counter === 0
                        ? // Push the current denominator counter
                          denominators.push(counter)
                        : null;
                    // Reduce the denominator count
                    counter--;
                }
                // Return the array of common denominators
                return denominators;
            }, [])
            .sort((denominator, next) => denominator - next)
            // Filter out any denominators that do not appear as many times as unique numerators
            .filter((denominator, index, denominators) => {
                return (
                    denominators[index] ===
                    denominators[index + numeratorsLength]
                );
            })
    );
};
