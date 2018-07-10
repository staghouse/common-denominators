module.exports = (name, fn) => {
    describe(name, () => {
        it('should take no arguments and return []', () => {
            let output = fn();
            let expected = [];

            expect(output).toEqual(expected);
        });

        it('should take all invalid arguments and return []', () => {
            let output = fn('', {}, []);
            let expected = [];

            expect(output).toEqual(expected);
        });

        it('should take a single number 8 and return [1, 2, 4, 8] ', () => {
            let output = fn(8);
            let expected = [1, 2, 4, 8];

            expect(output).toEqual(expected);
        });

        it('should take invalid arguments and 7 and 12 and return [1]', () => {
            let output = fn(7, 12, '', {}, []);
            let expected = [1];

            expect(output).toEqual(expected);
        });

        it('should take invalid arguments and 6 and 12 and return [1, 2, 3, 6]', () => {
            let output = fn(6, 12, '', {}, []);
            let expected = [1, 2, 3, 6];

            expect(output).toEqual(expected);
        });

        it('should take unsorted arguments and return [1, 2, 3, 6]', () => {
            let output = fn(12, 6, '', {}, []);
            let expected = [1, 2, 3, 6];

            expect(output).toEqual(expected);
        });

        it('should ignore negative numbers', () => {
            let output = fn(12, 6, -6);
            let expected = [1, 2, 3, 6];

            expect(output).toEqual(expected);
        });
    });
};
