module.exports = function() {
    const numerators = Array.from(
        new Set(
            Object.values(arguments).filter(
                numerator => Number.isInteger(numerator) && numerator > 0
            )
        )
    );
    let allDenominators = [];

    for (let i = 0; i < numerators.length; i++) {
        let num = numerators[i];

        for (let n = 1; n <= num; n++) {
            if (num % n === 0) {
                allDenominators.push(n);
            }
        }
    }

    allDenominators = Array.from(new Set(allDenominators));
    let commonDenominators = [];

    for (let i = 0; i < allDenominators.length; i++) {
        let denominator = allDenominators[i];
        let isCommon = true;

        for (let counter = 0; counter < numerators.length; counter++) {
            let numerator = numerators[counter];

            if (numerator % denominator !== 0) isCommon = false;
        }

        if (isCommon) commonDenominators.push(denominator);
    }

    return commonDenominators.sort((numerator, next) => numerator - next);
};
