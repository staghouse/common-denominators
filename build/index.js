function commonDenominators() {
    let commonDenominators = [];
    const allNumerators = Array.from(new Set(Object.values(arguments).filter(numerator => Number.isInteger(numerator) && numerator > 0))).sort((denominator, next) => denominator - next);
    const allDenominators = allNumerators.reduce((denominators, numerator, index, numerators) => {
        let counter = numerators[0];
        while (counter > 0) {
            numerator % counter === 0 && numerators[0] % counter === 0 ? denominators.push(counter) : null;
            counter--;
        }
        return denominators;
    }, []).sort((denominator, next) => denominator - next);
    Array.from(new Set(allDenominators)).reduce((counter, denominator) => {
        allNumerators.forEach(numerator => {
            numerator % denominator === 0 ? counter++ : false;
        });
        counter === allNumerators.length ? commonDenominators.push(denominator) : null;
        return counter = 0;
    }, 0);
    return commonDenominators;
}

module.exports = commonDenominators;