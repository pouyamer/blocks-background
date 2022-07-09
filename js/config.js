let config = {
  canvas: { size: { width: innerWidth, height: innerHeight } },
  square: {
    /*
     if boundToLight is true,
     hue and saturation will change on squares
     that are lit.
    */
    boundToLight: true,
    light: {
      /* 
      if the l value in hsl
        - true: uses the range
        - false: uses the value
      */
      isRanged: true,
      range: {
        // Max and Min value of light is [0 - 100]
        min: 0,
        max: 80
      },
      // if !isRanged then it gets the Value [0 - 100]
      value: 50,
      // rate of decrease / increase
      step: {
        increase: 5,
        decrease: 3
      },
      // if true changes the light value on random [0 - incOrDec]
      randomlyChange: true,
      // Frequency: How many of the squares will change the light value
      frequancy: 1,
      // if true, the light value will be on the min (o.w max) light range (if isRanged)
      defaultOnMin: false
    },

    hue: {
      /*
       if the h value in hsl
        - true: uses the range
        - false: uses the value
      */
      isRanged: true,
      range: {
        // Max and Min value of hue is [0 - 360]
        min: 220,
        max: 250
      },
      // if !isRanged then it gets the Value [0 - 360]
      value: 52,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 1,
        decrease: 1
      },
      // if true changes the hue value on random [0 - incOrDec]
      randomlyChange: true,

      /*
        Frequency: How many of the squares
        (Among the lit squares if boundToLight is true)
        will change the hue value
      */
      frequancy: 1,
      // if true sets the non-selected squares to the min (o.w max) hue range (if isRanged)
      defaultOnMin: true
    },

    saturation: {
      /* 
        if the s value in hsl
          - true: uses the range
          - false: uses the value
      */
      isRanged: true,
      range: {
        // Max and Min value of saturation is [0 - 100]
        min: 70,
        max: 100
      },
      // if !isRanged then it gets the Value [0 - 100]
      value: 20,
      //------------------------------
      // rate of decrease / increase
      step: {
        increase: 1,
        decrease: 1
      },
      // if true changes the saturation value on random [0 - incOrDec]
      randomlyChange: true,

      /*
        Frequency: How many of the squares
        (Among the lit squares if boundToLight is true)
        will change the saturation value
      */
      frequancy: 0.5,
      // if true sets the non-selected squares to the min (o.w max) saturation range (if isRanged)
      defaultOnMin: false
    },

    size: 20, // Try above 15 for better performence
    fillColor: {
      // h, s, l is set once app runs
      a: 1
    },
    hasBorders: false,
    // modes: "square", "circle", "bowlingPin"
    mode: "bowlingPin",
    borderColor: {
      h: 340,
      s: 90,
      l: 0,
      a: 0.5
    }
  },
  settings: {}
}

// ADD: Error Handling (light.min > light.max)
