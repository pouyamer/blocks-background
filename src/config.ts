let config: IConfig = {
  accessibility: {
    //    If !config.accessibility.warning hide warning (NOT RECOMMENDED)
    warning: false,
    warningFadeOutDuration: 1000,
    showFramesPerSecond: false
  },
  canvas: {
    size: { width: innerWidth, height: innerHeight },
    clearAfterEachFrame: false
  },
  square: {
    /*
     if boundToLight is true,
     hue and saturation will change on squares
     that are lit.
    */
    boundToLight: true,
    hue: hueConfig,
    saturation: saturationConfig,
    light: lightConfig,
    // Try above 15 for better performence
    shapeSize: 20,
    // h, s, l is set once app runs
    fillColor: {
      a: 1
    },
    hasBorders: true,
    shape: "innerRectangle",
    innerRectangleMode: {
      frequency: 1,
      startingPosition: "random",
      forceSquare: false,
      borderOnFullShapeSize: true,
      rectangleFractionToFullShapeWidth: {
        min: 0.5,
        max: 1
      },
      rectangleFractionToFullShapeHeight: {
        min: 0.5,
        max: 1
      }
    },

    innerPolygonMode: {
      sideCount: {
        min: 4,
        max: 4
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
