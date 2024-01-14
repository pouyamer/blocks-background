interface IConfig {
  accessibility: {
    //    If !config.accessibility.warning hide warning (NOT RECOMMENDED)
    warning: boolean
    warningFadeOutDuration: number
    showFramesPerSecond: boolean
  }
  canvas: ICanvasConfig
  square: {
    /*
     if boundToLight is true,
     hue and saturation will change on squares
     that are lit.
    */
    boundToLight: boolean
    hue: IColorValueConfig
    saturation: IColorValueConfig
    light: IColorValueConfig
    shapeSize: number // Try above 15 for better performence
    fillColor: {
      // h, s, l is set once app runs
      a: number
    }
    hasBorders: boolean
    // shapes: "square", "circle", "bowlingPin", "chaos"
    shape: ShapeType
    borderColor: {
      h: number
      s: number
      l: number
      a: number
    }
  }
  settings: {}
}

// ADD: Error Handling (light.min > light.max)
