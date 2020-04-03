module.exports = (name, fn) => {
  const invalid = [1.2, -5, "", {}, []];

  describe(name, () => {
    it("should take no arguments and return an empty array", () => {
      let output = fn();
      let expected = [];

      expect(output).toEqual(expected);
    });

    it("should take all invalid arguments and return an empty array", () => {
      let output = fn("", {}, []);
      let expected = [];

      expect(output).toEqual(expected);
    });

    it("should take 1 and return 1", () => {
      let output = fn(1);
      let expected = [1];

      expect(output).toEqual(expected);
    });

    it("should take 8 and return [1, 2, 4, 8]", () => {
      let output = fn(8);
      let expected = [1, 2, 4, 8];

      expect(output).toEqual(expected);
    });

    it("should take multiple of the same valid argument", () => {
      let output = fn(8, 8);
      let expected = [1, 2, 4, 8];

      expect(output).toEqual(expected);
    });

    it("should take valid and invalid arguments and return [1]", () => {
      let output = fn(7, 12, ...invalid);
      let expected = [1];

      expect(output).toEqual(expected);
    });

    it("should take valid and invalid arguments and return [1, 2, 5, 10]", () => {
      let output = fn(10, 20, ...invalid);
      let expected = [1, 2, 5, 10];

      expect(output).toEqual(expected);
    });

    it("should take a series of small valid arguments and return [1]", () => {
      let output = fn(1, 2, 5, 37, 42);
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

    it("should take unsorted arguments and return [1, 2, 3, 6]", () => {
      let output = fn(12, 6);
      let expected = [1, 2, 3, 6];

      expect(output).toEqual(expected);
    });
  });
};
