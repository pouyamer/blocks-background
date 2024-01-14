interface IColorValueConfig {
  name: ColorValueNameType
  /*
       if the h value in hsl
        - true: uses the range
        - false: uses the value
      */
  /* varietyModes : "value", "values", "range", "ranges" */
  varietyMode: VarietyNameType
  range: {
    // Max and Min value of hue is [0 - 360]
    min: number
    max: number
  }
  // if varietyMode is "value" then it gets the Value [0 - 360]
  value: number
  // if varietyMode is "values" then it gets the Values [0 - 360]
  values: number[]
  //------------------------------
  // rate of decrease / increase
  step: {
    increase: number
    decrease: number
  }
  // if true changes the hue value on random [0 - incOrDec]
  randomlyChange: boolean

  /*
        Frequency: How many of the squares
        (Among the lit squares if boundToLight is true)
        will change the hue value
      */
  frequancy: number
  // if true sets the non-selected squares to the min (o.w max) saturation range (if varietyMode is "range")
  defaultOnMin: boolean

  // determine how starting value is selected
  startOnValue: StartOnValueType
}
