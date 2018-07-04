const commonDenominators = (...args) => {
    const allNumerators = Array.from(
        new Set(
            args.filter(
                numerator => Number.isInteger(numerator) && numerator > 0
            )
        )
    ).sort((numerator, next) => numerator - next);
    const numeratorsLength = allNumerators.length - 1;
    return allNumerators
        .reduce((denominators, numerator, index, numerators) => {
            let counter = numerators[0];
            while (counter > 0) {
                numerator % counter === 0 && numerators[0] % counter === 0
                    ? denominators.push(counter)
                    : null;
                counter--;
            }
            return denominators;
        }, [])
        .sort((denominator, next) => denominator - next)
        .filter((denominator, index, denominators) => {
            return (
                denominators[index] === denominators[index + numeratorsLength]
            );
        });
};

module.exports = commonDenominators;
