function commonDenominators() {
    // Array of all common denominators
    let commonDenominators = [];
    // All unique numerators
    const allNumerators = Array.from(
        new Set(
            Object.values(arguments).filter(
                // Accept only integers larger than 0
                numerator => Number.isInteger(numerator) && numerator > 0
            )
        )
    ).sort((denominator, next) => denominator - next);

    // Iterate over all unique denominators then store the ones
    // that are denominators of every numerator
    Array.from(
        new Set(
            allNumerators
                .reduce((denominators, numerator, index, numerators) => {
                    let counter = numerators[0];
                    while (counter > 0) {
                        numerator % counter === 0 &&
                        numerators[0] % counter === 0
                            ? denominators.push(counter)
                            : null;
                        counter--;
                    }
                    return denominators;
                }, [])
                .sort((denominator, next) => denominator - next)
        )
    ).reduce((counter, denominator) => {
        allNumerators.forEach(numerator => {
            numerator % denominator === 0 ? counter++ : false;
        });
        counter === allNumerators.length
            ? commonDenominators.push(denominator)
            : null;
        return (counter = 0);
    }, 0);
    return commonDenominators;
}

module.exports = commonDenominators;
