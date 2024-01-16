class Square implements ISquare {
  colIndex: number
  rowIndex: number
  squareConfig: ISquareConfig
  x: number
  y: number
  appConfig: IConfig

  constructor(
    x: number,
    y: number,
    appConfig: IConfig,
    colIndex: number,
    rowIndex: number
  ) {
    this.colIndex = colIndex
    this.rowIndex = rowIndex
    this.appConfig = appConfig

    const {
      hue,
      saturation,
      light,
      alpha,
      boundToLight,
      borderColor,
      shape,
      shapeSize
    } = this.appConfig.square

    this.squareConfig = {
      fillColor: new HslColor(
        this.determineStartingColorValue("hue", hue.startOnValue),
        this.determineStartingColorValue("saturation", saturation.startOnValue),
        this.determineStartingColorValue("light", light.startOnValue),
        alpha
      ),
      boundToLight: boundToLight,
      hasBorders: this.appConfig.square.hasBorders,
      shape,
      shapeSize,
      borderColor: new HslColor(
        borderColor.h,
        borderColor.s,
        borderColor.l,
        borderColor.a
      ),
      willChangeHue: Math.random() < hue.frequancy,
      willChangeSaturation: Math.random() < saturation.frequancy,
      isTurningOn: true,
      isHueIncreasing: true,
      isBecomingSaturated: true,

      // it'll be set once the app runs
      isLit: Math.random() < light.frequancy
    }

    const { isLit: isSquareLit } = this.squareConfig

    // reassigning willChangeHue and willChangeSaturation
    if (boundToLight) {
      this.squareConfig.willChangeHue = isSquareLit
        ? Math.random() < hue.frequancy
        : false
      this.squareConfig.willChangeSaturation = isSquareLit
        ? Math.random() < saturation.frequancy
        : false
    }

    this.x = x
    this.y = y
  }

  determineStartingColorValue = (
    colorValueName: ColorValueNameType,
    startOnValue: StartOnValueType
  ) => {
    const { hue, saturation, light } = this.appConfig.square

    let colorValue: IColorValueConfig
    switch (colorValueName) {
      case "hue":
        colorValue = hue
        break
      case "saturation":
        colorValue = saturation
        break
      case "light":
        colorValue = light
        break
      default:
        throw new Error("Unknown Color Value")
    }

    if (colorValue.varietyMode === "value") return colorValue.value

    // errors
    switch (startOnValue) {
      case "min":
      case "max":
        if (colorValue.varietyMode !== "range") {
          throw new Error(
            `can't determine starting ${startOnValue} ${colorValue.name} value w/ varietymode:${colorValue.varietyMode}`
          )
        }
        break
      case "smallest":
      case "largest":
        if (colorValue.varietyMode !== "values") {
          throw new Error(
            `can't determine starting ${startOnValue} ${colorValue.name} value w/ varietymode:${colorValue.varietyMode}`
          )
        }
      case "random":
    }

    switch (colorValue.varietyMode) {
      case "values":
        if (startOnValue === "largest") return Math.max(...colorValue.values)
        if (startOnValue === "smallest") return Math.min(...colorValue.values)
        if (startOnValue === "random")
          return colorValue.values[
            Math.floor(Math.random() * colorValue.values.length)
          ]
        throw new Error(`Unknown values method`)
      case "range":
        if (startOnValue === "min") return colorValue.range.min
        if (startOnValue === "max") return colorValue.range.max
        if (startOnValue === "random")
          return randBetween(colorValue.range.min, colorValue.range.max)
      case "ranges":
        throw new Error("ranges is not implemented yet!")
    }
  }

  // Light Functions:
  lightOn = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]

    const { fillColor } = this.squareConfig
    const { randomlyChange, step, range } = this.appConfig.square.light

    const { max } = range

    fillColor.l += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.l > max) {
      this.squareConfig.isTurningOn = false
      fillColor.l = max
    }
  }

  lightOff = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]

    const { l: squareL } = this.squareConfig.fillColor

    const { randomlyChange, step, range } = this.appConfig.square.light

    const { min } = range

    this.squareConfig.fillColor.l -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (squareL < min) {
      this.squareConfig.isTurningOn = true
      this.squareConfig.fillColor.l = min
    }
  }

  lightOnAndOff = () => {
    this.squareConfig.isTurningOn ? this.lightOn() : this.lightOff()
  }

  // Hue Functions:

  hueUp = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor } = this.squareConfig

    const { randomlyChange, step, range } = this.appConfig.square.hue

    const { max } = range

    fillColor.h += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.h > max) {
      this.squareConfig.isHueIncreasing = false
      fillColor.h = max
    }
  }

  hueDown = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor } = this.squareConfig

    const { randomlyChange, step, range } = this.appConfig.square.hue

    const { min } = range

    fillColor.h -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (fillColor.h < min) {
      this.squareConfig.isHueIncreasing = true
      fillColor.h = min
    }
  }

  hueUpAndDown = () => {
    this.squareConfig.isHueIncreasing ? this.hueUp() : this.hueDown()
  }

  changeValueOnValuesMode = (colorValueName: ColorValueNameType) => {
    const { hue, saturation, light } = this.appConfig.square

    const { fillColor } = this.squareConfig
    let colorValue

    switch (colorValueName) {
      case "hue":
        colorValue = hue
        break
      case "saturation":
        colorValue = saturation
        break
      case "light":
        colorValue = light
        break
      default:
        throw new Error("Unknown Color Value")
    }

    if (colorValue?.values === undefined) {
      console.log("undefined")
      return
    }

    const { values } = colorValue

    const randomValue = values[Math.floor(Math.random() * values.length)]
    if (colorValueName === "hue") {
      fillColor.h = randomValue
      return
    }
    if (colorValueName === "saturation") {
      fillColor.s = randomValue
      return
    }
    if (colorValueName === "light") {
      fillColor.l = randomValue
      return
    }
  }

  saturate = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor } = this.squareConfig

    const { randomlyChange, step, range } = this.appConfig.square.saturation

    const { max } = range

    fillColor.s += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.s > max) {
      this.squareConfig.isBecomingSaturated = false
      fillColor.s = max
    }
  }

  desaturate = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor } = this.squareConfig

    const { randomlyChange, step, range } = this.appConfig.square.saturation

    const { min } = range

    fillColor.s -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (fillColor.s < min) {
      this.squareConfig.isBecomingSaturated = true
      fillColor.s = min
    }
  }

  saturateAndDesaturate = () => {
    this.squareConfig.isBecomingSaturated ? this.saturate() : this.desaturate()
  }

  fillAndStroke = (ctx: CanvasRenderingContext2D) => {
    const { shape, fillColor, borderColor } = this.squareConfig

    if (!borderColor) {
      throw new Error()
    }

    ctx.strokeStyle = borderColor.toString()
    ctx.fillStyle = fillColor.toString()

    switch (shape) {
      case "square":
        this.drawInSquareMode(ctx)
        break

      case "circle":
        this.drawInCircleMode(ctx)
        break

      case "bowlingPin":
        this.drawInBowlingPinMode(ctx)
        break

      case "chaos":
        this.drawInChaosMode(ctx)
        break

      case "innerRectangle":
        this.drawInInnerRectangleMode(ctx)
        break

      case "innerPolygon":
        this.drawInInnerPolygon(ctx)
        break

      // TODO: make innerPolygon mode correctly make a polygon
    }
  }

  update = (ctx: CanvasRenderingContext2D) => {
    const { light, hue, saturation } = this.appConfig.square

    const { fillColor } = this.squareConfig

    this.fillAndStroke(ctx)

    if (this.squareConfig.willChangeHue && hue.varietyMode === "values")
      this.changeValueOnValuesMode("hue")
    if (saturation.varietyMode === "values")
      this.changeValueOnValuesMode("saturation")

    if (this.squareConfig.isLit) {
      if (light.varietyMode === "values") this.changeValueOnValuesMode("light")
      if (light.varietyMode === "range") this.lightOnAndOff()
      if (light.varietyMode === "value") fillColor.l = light.value
    }

    // This Lights up the squares on run

    if (this.squareConfig.willChangeHue && hue.varietyMode === "range")
      this.hueUpAndDown()
    if (
      this.squareConfig.willChangeSaturation &&
      saturation.varietyMode === "range"
    ) {
      this.saturateAndDesaturate()
    }
  }

  drawInSquareMode = (ctx: CanvasRenderingContext2D) => {
    const { shapeSize, hasBorders } = this.appConfig.square

    ctx.fillRect(this.x, this.y, shapeSize, shapeSize)

    hasBorders && ctx.strokeRect(this.x, this.y, shapeSize, shapeSize)
  }

  drawInCircleMode = (ctx: CanvasRenderingContext2D) => {
    const { shapeSize, hasBorders } = this.appConfig.square

    ctx.beginPath()
    ctx.arc(
      this.x + shapeSize * 0.5,
      this.y + shapeSize * 0.5,
      shapeSize * 0.5,
      0,
      Math.PI * 2
    )
    ctx.fill()
    hasBorders && ctx.stroke()
  }

  drawInBowlingPinMode = (ctx: CanvasRenderingContext2D) => {
    const { shapeSize, hasBorders } = this.appConfig.square

    ctx.fillRect(this.x, this.y, shapeSize, shapeSize)
    ctx.beginPath()
    ctx.arc(this.x, this.y, shapeSize * 0.5, 0, Math.PI * 2)
    ctx.fill()
    if (hasBorders) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, shapeSize * 0.5, 0.5 * Math.PI, Math.PI * 2)
      ctx.lineTo(this.x + shapeSize, this.y)
      ctx.lineTo(this.x + shapeSize, this.y + shapeSize)
      ctx.lineTo(this.x, this.y + shapeSize)
      ctx.lineTo(this.x, this.y + shapeSize * 0.5)
      ctx.stroke()
    }
  }

  drawInChaosMode = (ctx: CanvasRenderingContext2D) => {
    const { shapeSize, hasBorders } = this.appConfig.square

    const x =
      this.x + Math.random() * shapeSize - (Math.random() * shapeSize) / 2
    const y =
      this.y + Math.random() * shapeSize - (Math.random() * shapeSize) / 2
    const size = Math.random() * shapeSize

    // fill
    ctx.fillRect(x, y, size, size)

    // stroke
    hasBorders && ctx.strokeRect(x, y, size, size)
  }

  drawInInnerRectangleMode = (ctx: CanvasRenderingContext2D) => {
    const getShapeStartingPosition = (
      startingPosition: startingPositionType,
      containerSize: number,
      shapeWidth: number,
      shapeHeight: number
    ): [number, number] => {
      const left = this.x
      const right = this.x - shapeWidth + containerSize
      const centerX = this.x + containerSize / 2 - shapeWidth / 2
      const centerY = this.y + containerSize / 2 - shapeHeight / 2
      const top = this.y
      const bottom = this.y - shapeHeight + containerSize

      const all3PossibleShapeStartingPositions_X = [left, right, centerX]
      const all3PossibleShapeStartingPositions_Y = [top, bottom, centerY]

      // it returns [x, y]
      switch (startingPosition) {
        case "top-left":
          return [left, top]

        case "top-right":
          return [right, top]

        case "bottom-left":
          return [left, bottom]

        case "bottom-right":
          return [right, bottom]

        case "center":
          return [centerX, centerY]

        case "left":
          return [left, centerY]

        case "right":
          return [right, centerY]

        case "top":
          return [centerX, top]

        case "bottom":
          return [centerX, bottom]
        case "random":
          return [randBetween(left, right), randBetween(top, bottom)]

        case "randomFrom9Positions":
          return [
            all3PossibleShapeStartingPositions_X[Math.round(randBetween(0, 2))],
            all3PossibleShapeStartingPositions_Y[Math.round(randBetween(0, 2))]
          ]

        case "xAxis":
          return [
            all3PossibleShapeStartingPositions_X[Math.round(randBetween(0, 1))],
            centerY
          ]
        case "yAxis":
          return [
            centerX,
            all3PossibleShapeStartingPositions_Y[Math.round(randBetween(0, 1))]
          ]

        case "diagonal":
          return [
            all3PossibleShapeStartingPositions_X[Math.round(randBetween(0, 1))],
            all3PossibleShapeStartingPositions_Y[Math.round(randBetween(0, 1))]
          ]

        case "unbound":
          return [
            Math.random() * this.appConfig.canvas.size.width,
            Math.random() * this.appConfig.canvas.size.height
          ]
        case "unboundX":
          return [
            Math.random() * this.appConfig.canvas.size.width,
            all3PossibleShapeStartingPositions_Y[Math.round(randBetween(0, 2))]
          ]
        case "unboundY":
          return [
            all3PossibleShapeStartingPositions_X[Math.round(randBetween(0, 2))],
            Math.random() * this.appConfig.canvas.size.height
          ]
      }
    }

    const {
      frequency: partPaintFrequency,
      startingPosition: partPaintStartingPosition,
      forceSquare,
      borderOnFullShapeSize,
      rectangleFractionToFullShapeWidth: { min: minRFW, max: maxRFW },
      rectangleFractionToFullShapeHeight: { min: minRFH, max: maxRFH }
    } = this.appConfig.square.innerRectangleMode

    const { shapeSize, hasBorders } = this.appConfig.square

    const shapeWidth = shapeSize * randBetween(minRFW, maxRFW)

    const shapeHeight = forceSquare
      ? shapeWidth
      : shapeSize * randBetween(minRFH, maxRFH)

    const [shapeStartingPointX, shapeStartingPointY] = getShapeStartingPosition(
      partPaintStartingPosition,
      shapeSize,
      shapeWidth,
      shapeHeight
    )

    if (Math.random() < partPaintFrequency) {
      ctx.fillRect(
        shapeStartingPointX,
        shapeStartingPointY,
        shapeWidth,
        shapeHeight
      )
      hasBorders &&
        !borderOnFullShapeSize &&
        ctx.strokeRect(
          shapeStartingPointX,
          shapeStartingPointY,
          shapeWidth,
          shapeHeight
        )
    }

    if (borderOnFullShapeSize && hasBorders) {
      ctx.strokeRect(this.x, this.y, shapeSize, shapeSize)
    }
  }

  drawInInnerPolygon = (ctx: CanvasRenderingContext2D) => {
    const { shapeSize: containerSize, hasBorders } = this.appConfig.square

    const { min: sideCountMin, max: sideCountMax } =
      this.appConfig.square.innerPolygonMode.sideCount

    const sideCount = Math.round(randBetween(sideCountMin, sideCountMax))

    const boundLeft = this.x
    const boundRight = this.x + containerSize
    const boundTop = this.y
    const boundBottom = this.y + containerSize

    // x1, x2, x3, ...
    let point_XArray: number[] = Array(sideCount)
      .fill(0)
      .map(() => randBetween(boundLeft, boundRight))

    // y1, y2, y3, ...
    let point_YArray: number[] = Array(sideCount)
      .fill(0)
      .map(() => randBetween(boundTop, boundBottom))

    let points: IPoint[] = point_XArray.map((x, i) => ({
      x,
      y: point_YArray[i]
    }))

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < sideCount; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.closePath()

    ctx.fill()
  }
}
