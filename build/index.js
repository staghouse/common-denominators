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
    let commonNumber = Math.ceil(median);
    while (commonNumber > 0) {
        if (denominators[0] % commonNumber === 0) {
            denominators.push(commonNumber);
        }
        commonNumber--;
    }
    denominators.reverse();
    if (numerators.length === 1) {
        return [ ...denominators ];
    }
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