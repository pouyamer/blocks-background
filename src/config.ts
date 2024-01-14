let config: IConfig = {
  accessibility: {
    //    If !config.accessibility.warning hide warning (NOT RECOMMENDED)
    warning: false,
    warningFadeOutDuration: 300,
    showFramesPerSecond: true
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
    hasBorders: true,
    // shapes: "square", "circle", "bowlingPin", "chaos"
    shape: "square",
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
