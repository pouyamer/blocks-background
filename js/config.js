const config = {
  canvasSize: {
    width: innerWidth,
    height: innerHeight
  },
  square: {
    light: {
      max: 30,
      min: 17,
      // rate of decrease / increase
      step: {
        increase: 1,
        decrease: 4
      },
      // changes the light value on random [0 - incOrDec]
      randomlyChange: true
    },

    size: 17, // Try above 15 for better performence
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
