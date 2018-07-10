function denoms(num) {
    let denoms = [ num ];
    let counter = Math.ceil(num / 2);
    while (counter > 0) {
        if (num % counter === 0) denoms.push(counter);
        counter--;
    }
    return denoms;
}

const commonDenominators = (...args) => {
    const numerators = args.filter(numerator => Number.isInteger(numerator) && numerator > 0);
    const min = Math.min(...numerators);
    if (min < 2) return [ 1 ];
    if (!numerators.length) return numerators;
    const denominators = denoms(min).sort((denominator, next) => denominator - next);
    if (numerators.length === 1) return [ ...denominators ];
    numerators.splice(1, numerators.length - 1).map(numerator => {
        let denominator = denominators.length - 1;
        while (denominator >= 0) {
            if (numerator % denominators[denominator] !== 0) {
                denominators.splice(denominator, 1);
            }
            denominator--;
        }
    });
    return denominators;
};

module.exports = commonDenominators;