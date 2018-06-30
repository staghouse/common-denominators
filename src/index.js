function commonDenominators() {
    let commonDenominators = [];
    const allNumerators = Array.from(
        new Set(
            Object.values(arguments).filter(
                numerator => Number.isInteger(numerator) && numerator > 0
            )
        )
    ).sort((denominator, next) => denominator - next);

    let starterDenominators = [];
    let i = allNumerators[0];
    let a = allNumerators[0];

    while (i > 0) {
        a % i === 0 ? starterDenominators.push(i): null;
        i--;
    }

    if(allNumerators.length < 2 || (starterDenominators.length === 1)) {
        return starterDenominators.reverse();
    }

    const allDenominators = allNumerators.slice(1)
        .reduce((denominators, numerator) => {
            let counter = starterDenominators.length - 1;
            while (counter > 0) {
                numerator % starterDenominators[counter] === 0
                    ? denominators.push(starterDenominators[counter])
                    : null;
                counter--;
            }
            return denominators;
        }, starterDenominators)
        .sort((denominator, next) => denominator - next);
    Array.from(new Set(allDenominators)).reduce((counter, denominator) => {
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
