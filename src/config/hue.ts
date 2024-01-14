const hueConfig: IColorValueConfig = {
  name: "hue",
  /*
       if the h value in hsl
        - true: uses the range
        - false: uses the value
      */
  /* varietyModes : "value", "values", "range", "ranges" */
  varietyMode: "range",
  range: {
    // Max and Min value of hue is [0 - 360]
    min: 120,
    max: 130
  },
  // if varietyMode is "value" then it gets the Value [0 - 360]
  value: 140,
  // if varietyMode is "values" then it gets the Values [0 - 360]
  values: [0, 180, 360],
  //------------------------------
  // rate of decrease / increase
  step: {
    increase: 2,
    decrease: 3
  },
  // if true changes the hue value on random [0 - incOrDec]
  randomlyChange: true,

  /*
        Frequency: How many of the squares
        (Among the lit squares if boundToLight is true)
        will change the hue value
      */
  frequancy: 0,
  // if true sets the non-selected squares to the min (o.w max) hue range (if varietyMode is "range")
  defaultOnMin: true,
  startOnValue: "min"
}
