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
        min: 17,
        max: 35
      },
      // if !isRanged then it gets the Value [0 - 100]
      value: 40,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 2,
        decrease: 5
      },
      // if true changes the light value on random [0 - incOrDec]
      randomlyChange: true
    },

    hue: {
      // if the h value in hsl
      //  - true: uses the range
      //  - false: uses the value
      isRanged: true,
      range: {
        // Max and Min value of hue is [0 - 360]
        min: 335,
        max: 340
      },
      // if !isRanged then it gets the Value [0 - 360]
      value: 340,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 2,
        decrease: 2
      },
      // if true changes the hue value on random [0 - incOrDec]
      randomlyChange: true
    },

    size: 14, // Try above 15 for better performence
    fillColor: {
      h: 340,
      s: 100,
      l: 66, // "l" value is set once the app runs
      a: 1
    },
    strokeColor: {
      h: 340,
      s: 100,
      l: 10,
      a: 0.5
    }
  }
}

// ADD: Error Handling (light.min > light.max)
