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
  tile: {
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
    tileSize: 20,
    // h, s, l is set once app runs
    alpha: 1,
    hasBorders: false,
    innerShape: "innerRectangle",
    innerRectangleMode: {
      frequency: 1,
      startingPosition: "xAxis",
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
      },
      borderOnFullShapeSize: false
    },
    borderColor: {
      h: 340,
      s: 90,
      l: 0,
      a: 1
    },
    offColor: {
      h: 20,
      s: 65,
      l: 85,
      a: 1
    }
  },
  settings: {}
}

// ADD: Error Handling (light.min > light.max)
