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
    // Try above 15 for better performence
    shapeSize: number
    // h, s, l is set once app runs
    alpha: number

    hasBorders: boolean
    // shapes: "square", "circle", "bowlingPin", "chaos", ...
    shape: ShapeType

    innerRectangleMode: {
      // frequency [0 - 1] in which the blocks get repainted (in innerRectangle mode)
      frequency: number

      startingPosition: startingPositionType
      // if set to true it shape width === height
      forceSquare: boolean

      // if true => border will get on
      //            shapeSize set in config file
      // if false => border will get on
      //             new shape
      borderOnFullShapeSize: boolean

      // min and max values that width and height of the rectangle to shapeSize square
      // if (forceSquare => true)
      //     gets both from width
      rectangleFractionToFullShapeWidth: IRange
      rectangleFractionToFullShapeHeight: IRange
    }

    innerPolygonMode: {
      // side count of said Polygon (>3)
      sideCount: IRange
    }

    borderColor: IHslColor
    offColor: IHslColor
  }
  settings: {}
}

// ADD: Error Handling (light.min > light.max)
