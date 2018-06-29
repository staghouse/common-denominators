function stag() {
    // Get valid values from arguments
    const arrayFromObject = Object.values(arguments).filter(
        current => Number.isInteger(current) && Number(current) > 0
    );
    // Create a set of unique values
    const uniqueNumeratorsFromSet = Array.from(new Set(arrayFromObject));
    // Count of how many numbers to check
    const uniqueNumeratorsLength = uniqueNumeratorsFromSet.length;
    // Temporary array to store a numerators array of all denominators
    let allDenominators = [];
    // Return value of all common denominators
    let common = [];

    // For each of our values
    for (let i = 0; i < uniqueNumeratorsLength; i++) {
        // Store the value via Symbol.iterator
        const numerator = uniqueNumeratorsFromSet[i];
        // The denominator to check it against
        let denominator = 1;
        // Store the valid denominators for the specific number
        let denominators = [];

        // Only while the denominator is valid to divide against
        while (denominator <= numerator) {
            // If the modulo is 0 that means it divides evenly
            if (numerator % denominator === 0) {
                // Store this denominator in the list
                denominators = [...denominators, denominator];
            }

            // Increase the denominator count
            denominator++;
        }

        // Update the master list of all denominators found
        allDenominators = [...allDenominators, ...denominators];
    }

    // Create a unique set to iterate over
    const uniqueDenominatorsFromSet = Array.from(new Set(allDenominators)).sort(
        (a, b) => a - b
    );
    // Length of unique denominators
    const uniqueDenominatorsLength = uniqueDenominatorsFromSet.length;

    allDenominators = allDenominators.sort((a, b) => a - b);

    // For every unique denominator
    for (let i = 0; i < uniqueDenominatorsLength; i++) {
        // Store the denominator via Symbol.iterator
        const denom = uniqueDenominatorsFromSet[i];
        let count = 0;

        // For each denominator in our flattened array
        allDenominators.forEach((value, index) => {
            // If the denominator appears increase the count
            count = allDenominators[index] === denom ? count + 1 : count;
        });

        // If the denominator count matches the
        // amount of total numerators
        if (count === uniqueNumeratorsLength) {
            // Merge it in to the array of common denominators
            common = [...common, denom];
        }
    }

    // Return all common denominators
    return common;
}

console.log(stag(6, 10));
