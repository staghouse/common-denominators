module.exports = {
  tests: [
    {
      name: "Source (Working)",
      fns: [require("../../src/index.min")]
    },
    {
      name: "Build (Stable)",
      fns: [require("../../build/index.min")]
    },
    {
      name: "Control (v1)",
      fns: [require("./control/index.min")]
    }
  ],
  data: [
    {
      name: "Few Numbers",
      data: require("./data/arrayOfFewNumbers")
    },
    {
      name: "Many Numbers",
      data: require("./data/arrayOfManyNumbers")
    }
  ]
};
