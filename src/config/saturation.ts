const saturationConfig: IColorValueConfig = {
  name: "saturation",
  /* 
        if the s value in hsl
          - true: uses the range
          - false: uses the value
      */
  /* varietyModes : "value", "values", "range", "ranges" */
  varietyMode: "range",
  range: {
    // Max and Min value of saturation is [0 - 100]
    min: 60,
    max: 85
  },
  // if varietyMode is "value" then it gets the Value [0 - 100]
  value: 85,
  // if varietyMode is "values" then it gets the Array of Values [0 - 100]
  values: [70, 82],
  //------------------------------
  // rate of decrease / increase
  step: {
    increase: 1,
    decrease: 3
  },
  // if true changes the saturation value on random [0 - incOrDec]
  randomlyChange: true,

  /*
        Frequency: How many of the squares
        (Among the lit squares if boundToLight is true)
        will change the saturation value
      */
  frequancy: 0,
  // if true sets the non-selected squares to the min (o.w max) saturation range (if varietyMode is "range")
  defaultOnMin: false,
  startOnValue: "min"
}
