const lightConfig: IColorValueConfig = {
  name: "light" /* 
      if the l value in hsl
        - true: uses the range
        - false: uses the value
      */,
  /* varietyModes : "value", "values", "range", "ranges" */
  varietyMode: "range",
  range: {
    // Max and Min value of light is [0 - 100]
    min: 20,
    max: 75
  },
  // if varietyMode is "value" then it gets the Value [0 - 100]
  value: 60,
  // if varietyMode is "values" then it gets the Values [0 - 100]
  values: [20, 40, 50],
  // rate of decrease / increase
  step: {
    increase: 10,
    decrease: 10
  },
  // if true changes the light value on random [0 - incOrDec]
  randomlyChange: true,
  // Frequency: How many of the squares will change the light value
  frequancy: 1,
  // if true, the light value will be on the min (o.w max) light range (if varietyMode is "range")
  defaultOnMin: true,
  startOnValue: "random"
}
