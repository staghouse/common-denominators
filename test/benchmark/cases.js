module.exports = {
  // Comment out tests as needed
  tests: [
    // Make sure the source is always the first case
    {
      name: "Source (Working)",
      fns: [require("../../src/index.min")]
    },
    {
      name: "Dist (Stable)",
      fns: [require("../../dist/index.min")]
    },
    // {
    //   name: "Control (v1)",
    //   fns: [require("./control/index.min")]
    // }
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
