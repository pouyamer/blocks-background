let config = {
  canvas: { size: { width: innerWidth, height: innerHeight } },
  square: {
    // if boundToLight is true,
    // hue and saturation will change on squares
    // that are lit.
    boundToLight: true,
    light: {
      // if the l value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of light is [0 - 100]
        min: 20,
        max: 45
      },
      // if !isRanged then it gets the Value [0 - 100]
      // off: light value if the square is not chosen by frequency
      value: 35,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 4,
        decrease: 1
      },
      // if true changes the light value on random [0 - incOrDec]
      randomlyChange: true,
      // Frequency: How many of the squares will change the light value
      frequancy: 1,
      // if true, the light value will be on the min
      defaultOnMin: true
    },

    hue: {
      // if the h value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of hue is [0 - 360]
        min: 345,
        max: 350
      },
      // if !isRanged then it gets the Value [0 - 360]
      value: 52,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 5,
        decrease: 1
      },
      // if true changes the hue value on random [0 - incOrDec]
      randomlyChange: true,

      // Frequency: How many of the squares
      // (Among the lit squares if boundToLight is true)
      // will change the hue value
      frequancy: 0.8,
      // if true sets the non-selected squares to the min hue range
      // (ranged)
      defaultOnMin: true
    },

    saturation: {
      // if the s value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of saturation is [0 - 100]
        min: 60,
        max: 80
      },
      // if !isRanged then it gets the Value [0 - 100]
      value: 20,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 5,
        decrease: 1
      },
      // if true changes the saturation value on random [0 - incOrDec]
      randomlyChange: true,

      // Frequency: How many of the squares
      // (Among the lit squares if boundToLight is true)
      // will change the saturation value
      frequancy: 1,
      // if true sets the non-selected squares to the min saturation range
      // (ranged)
      defaultOnMin: true
    },

    size: 12, // Try above 15 for better performence
    fillColor: {
      h: 0,
      s: 90,
      l: 0, // "l" value is set once the app runs
      a: 1
    },
    hasBorders: false,
    borderColor: {
      h: 340,
      s: 90,
      l: 0,
      a: 0.5
    }
  }
}

// ADD: Error Handling (light.min > light.max)
