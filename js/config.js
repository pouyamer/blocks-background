let config = {
  canvas: canvasConfig,
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
    shapeSize: 20, // Try above 15 for better performence
    fillColor: {
      // h, s, l is set once app runs
      a: 1
    },
    hasBorders: false,
    // shapes: "square", "circle", "bowlingPin"
    shape: "bowlingPin",
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
