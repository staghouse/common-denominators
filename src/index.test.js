import commonDenominators from './index';

describe('common denominators', () => {
    it('should take nothing and return []', () => {
        let output = commonDenominators();
        let expected = [];

        expect(output).toEqual(expected);
    });

    it('should take all invalid arguments and return an array of []', () => {
        let output = commonDenominators('', {}, []);
        let expected = [];

        expect(output).toEqual(expected);
    });

    it('should take number 8 and return an array of [1, 2, 4, 8] ', () => {
        let output = commonDenominators(8);
        let expected = [1, 2, 4, 8];

        expect(output).toEqual(expected);
    });

    it('should take a mixed amount of arguments including 6 and 10 and invalid values and 1, 2, 3, 6', () => {
        let output = commonDenominators(6, 12, '', {}, []);
        let expected = [1, 2, 3, 6];

        expect(output).toEqual(expected);
    });

    it('should take unsorted arguments of numbers and still return ordered denominators of 1, 2, 3, 6', () => {
        let output = commonDenominators(12, 6, '', {}, []);
        let expected = [1, 2, 3, 6];

        expect(output).toEqual(expected);
    });
});
