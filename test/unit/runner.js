module.exports = (name, fn) => {
  describe(name, () => {
    it("should take no arguments and return []", () => {
      let output = fn();
      let expected = [];

      expect(output).toEqual(expected);
    });

    it("should take all invalid arguments and throw a SyntaxError", () => {
      let output = fn("", {}, []);
      let expected = [];

      expect(output).toEqual(expected);
    });

    it("should take 1 and return [1]", () => {
      let output = fn(1);
      let expected = [1];

      expect(output).toEqual(expected);
    });

    it("should take a single number 8 and return [1, 2, 4, 8] ", () => {
      let output = fn(8);
      let expected = [1, 2, 4, 8];

      expect(output).toEqual(expected);
    });

    it("should take repeat numbers 8 and return [1, 2, 4, 8] ", () => {
      let output = fn(8, 8);
      let expected = [1, 2, 4, 8];

      expect(output).toEqual(expected);
    });

    it("should take a lower decimal and 8 and return [1, 2, 4, 8] ", () => {
      let output = fn(7.9, 8);
      let expected = [1, 2, 4, 8];

      expect(output).toEqual(expected);
    });

    it("should take invalid arguments and 7 and 12 and return [1]", () => {
      let output = fn(7, 12, "", {}, []);
      let expected = [1];

      expect(output).toEqual(expected);
    });

    it("should take a series of small valid arguments and return [1, 2]", () => {
      let output = fn(2, 6, 12, 24, 30);
      let expected = [1, 2];

      expect(output).toEqual(expected);
    });

    it("should take a series of large valid arguments and return [1]", () => {
      let output = fn(845, 3532, 389, 7000, 10964);
      let expected = [1];

      expect(output).toEqual(expected);
    });

    it("should take a series of large valid arguments and return [1, 2, 5, 10]", () => {
      let output = fn(10, 50, 1000, 10960);
      let expected = [1, 2, 5, 10];

      expect(output).toEqual(expected);
    });

    it("should take invalid arguments and 20 and 100 and return [1, 2, 4, 5, 10, 20]", () => {
      let output = fn(20, 100, "", {}, []);
      let expected = [1, 2, 4, 5, 10, 20];

      expect(output).toEqual(expected);
    });

    it("should take unsorted arguments and return [1, 2, 3, 6]", () => {
      let output = fn(12, 6, "", {}, []);
      let expected = [1, 2, 3, 6];

      expect(output).toEqual(expected);
    });

    it("should ignore negative numbers", () => {
      let output = fn(12, 6, -6);
      let expected = [1, 2, 3, 6];

      expect(output).toEqual(expected);
    });
  });
};
