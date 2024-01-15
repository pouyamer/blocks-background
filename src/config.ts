let config: IConfig = {
  accessibility: {
    //    If !config.accessibility.warning hide warning (NOT RECOMMENDED)
    warning: false,
    warningFadeOutDuration: 1000,
    showFramesPerSecond: false
  },
  canvas: { size: { width: innerWidth, height: innerHeight } },
  square: {
    /*
     if boundToLight is true,
     hue and saturation will change on squares
     that are lit.
    */
    boundToLight: false,
    hue: hueConfig,
    saturation: saturationConfig,
    light: lightConfig,
    shapeSize: 20, // Try above 15 for better performence
    fillColor: {
      // h, s, l is set once app runs
      a: 1
    },
    hasBorders: false,
    shape: "innerRectangle",
    innerRectangleMode: {
      frequency: 1,
      startingPosition: "random",
      forceSquare: false,
      borderOnFullShapeSize: true,
      rectangleFractionToFullShapeWidth: {
        min: 0,
        max: 1
      },
      rectangleFractionToFullShapeHeight: {
        min: 0,
        max: 1
      }
    },
    borderColor: {
      h: 340,
      s: 90,
      l: 0,
      a: 0.1
    }
  },
  settings: {}
}

// ADD: Error Handling (light.min > light.max)
