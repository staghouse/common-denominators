const commonDenominators = require('../build/index.min');

describe('common denominators WIP', () => {
    it('should take no arguments and return []', () => {
        let output = commonDenominators();
        let expected = [];

        expect(output).toEqual(expected);
    });

    it('should take all invalid arguments and return []', () => {
        let output = commonDenominators('', {}, []);
        let expected = [];

        expect(output).toEqual(expected);
    });

    it('should take a single number 8 and return [1, 2, 4, 8] ', () => {
        let output = commonDenominators(8);
        let expected = [1, 2, 4, 8];

        expect(output).toEqual(expected);
    });

    it('should take invalid arguments and 6 and 10 and return [1, 2, 3, 6]', () => {
        let output = commonDenominators(6, 12, '', {}, []);
        let expected = [1, 2, 3, 6];

        expect(output).toEqual(expected);
    });

    it('should take unsorted arguments and return [1, 2, 3, 6]', () => {
        let output = commonDenominators(12, 6, '', {}, []);
        let expected = [1, 2, 3, 6];

        expect(output).toEqual(expected);
    });

    it('should take ignore negative numbers', () => {
        let output = commonDenominators(12, 6, -6);
        let expected = [1, 2, 3, 6];

        expect(output).toEqual(expected);
    });
});
