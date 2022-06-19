const config = {
  canvasSize: {
    width: innerWidth,
    height: innerHeight
  },
  square: {
    light: {
      max: 30,
      min: 10,
      // rate of decrease / increase
      step: {
        increase: 1,
        decrease: 5
      },
      // changes the light value on random [0 - incOrDec]
      randomlyChange: true
    },

    size: 20,
    fillColor: {
      h: 340,
      s: 100,
      l: 66,
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
