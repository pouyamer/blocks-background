let config = {
  canvas: { size: { width: innerWidth, height: innerHeight } },
  square: {
    light: {
      // if the l value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of light is [0 - 100]
        min: 10,
        max: 30
      },
      // if !isRanged then it gets the Value [0 - 100]
      // off: light value if the square is not chosen by frequency
      value: {
        off: 10,
        on: 35
      },
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 0.8,
        decrease: 2.4
      },
      // if true changes the light value on random [0 - incOrDec]
      randomlyChange: true,
      // Frequency: How many of the squares will change the light value
      frequancy: 1
    },

    hue: {
      // if the h value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of hue is [0 - 360]
        min: 190,
        max: 210
      },
      // if !isRanged then it gets the Value [0 - 360]
      value: 20,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 5,
        decrease: 1
      },
      // if true changes the hue value on random [0 - incOrDec]
      randomlyChange: true,
      // Frequency: How many of the squares
      // (Among the lit squares)
      // will change the hue value
      frequancy: 0.4
    },

    size: 10, // Try above 15 for better performence
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
