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

    const { hue, saturation, light, boundToLight } = this.appConfig.square

    this.squareConfig = {
      fillColor: {
        h: this.determineStartingColorValue("hue", hue.startOnValue),
        s: this.determineStartingColorValue(
          "saturation",
          saturation.startOnValue
        ),
        l: this.determineStartingColorValue("light", light.startOnValue),
        a: this.appConfig.square.fillColor.a
      },
      boundToLight: this.appConfig.square.boundToLight,
      hasBorders: this.appConfig.square.hasBorders,
      shape: this.appConfig.square.shape,
      shapeSize: this.appConfig.square.shapeSize,
      borderColor: this.appConfig.square.borderColor,
      willChangeHue: Math.random() < hue.frequancy,
      willChangeSaturation: Math.random() < saturation.frequancy,
      isTurningOn: true,
      isHueIncreasing: true,
      isBecomingSaturated: true,

      // it'll be set once the app runs
      isLit: Math.random() < this.appConfig.square.light.frequancy
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
    const { shape, fillColor, shapeSize, hasBorders, borderColor } =
      this.squareConfig

    ctx.strokeStyle = hslStringify(
      borderColor || {
        h: 0,
        s: 0,
        l: 0,
        a: 0
      }
    )
    ctx.fillStyle = hslStringify(fillColor)

    switch (shape) {
      case "square":
        ctx.fillRect(this.x, this.y, shapeSize, shapeSize)
        hasBorders && ctx.strokeRect(this.x, this.y, shapeSize, shapeSize)
        break

      case "circle":
        ctx.beginPath()
        ctx.arc(this.x, this.y, shapeSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
        hasBorders && ctx.stroke()
        break

      case "bowlingPin":
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
        break

      case "chaos":
        const x =
          this.x + Math.random() * shapeSize - (Math.random() * shapeSize) / 2
        const y =
          this.y + Math.random() * shapeSize - (Math.random() * shapeSize) / 2
        const size = Math.random() * shapeSize

        // fill
        ctx.fillRect(x, y, size, size)

        // stroke
        hasBorders && ctx.strokeRect(x, y, size, size)
        break
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
}
