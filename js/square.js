class Square {
  constructor(x, y, squareConfig) {
    this.squareConfig = squareConfig
    this.x = x
    this.y = y

    // it'll be set once the app runs
    this.isLit = false

    const { hue, saturation } = squareConfig
    this.willChangeHue = Math.random() < hue.frequancy
    this.willChangeSaturation = Math.random() < saturation.frequancy
    this.isTurningOn = true
    this.isHueIncreasing = true
    this.isBecomingSaturated = true
  }

  // Light Functions:
  lightOn = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const { fillColor, light } = this.squareConfig
    const {
      randomlyChange,
      step,
      range: { max }
    } = light

    fillColor.l += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.l > max) {
      this.isTurningOn = false
      fillColor.l = max
    }
  }

  lightOff = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const { fillColor, light } = this.squareConfig

    const {
      randomlyChange,
      step,
      range: { min }
    } = light

    fillColor.l -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (fillColor.l < min) {
      this.isTurningOn = true
      fillColor.l = min
    }
  }

  lightOnAndOff = () => {
    this.isTurningOn ? this.lightOn() : this.lightOff()
  }

  // Hue Functions:

  hueUp = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor, hue } = this.squareConfig
    const {
      randomlyChange,
      step,
      range: { max }
    } = hue

    fillColor.h += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.h > max) {
      this.isHueIncreasing = false
      fillColor.h = max
    }
  }

  hueDown = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor, hue } = this.squareConfig
    const {
      randomlyChange,
      step,
      range: { min }
    } = hue

    fillColor.h -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (fillColor.h < min) {
      this.isHueIncreasing = true
      fillColor.h = min
    }
  }

  hueUpAndDown = () => {
    this.isHueIncreasing ? this.hueUp() : this.hueDown()
  }

  changeValueOnValuesMode = colorValueName => {
    const { hue, saturation, light, fillColor } = this.squareConfig
    const colorValue = [hue, saturation, light].find(
      clrValue => clrValue.name === colorValueName
    )
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
    const { fillColor, saturation } = this.squareConfig
    const {
      randomlyChange,
      step,
      range: { max }
    } = saturation

    fillColor.s += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (fillColor.s > max) {
      this.isBecomingSaturated = false
      fillColor.s = max
    }
  }

  desaturate = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const { fillColor, saturation } = this.squareConfig
    const {
      randomlyChange,
      step,
      range: { min }
    } = saturation

    fillColor.s -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (fillColor.s < min) {
      this.isBecomingSaturated = true
      fillColor.s = min
    }
  }

  saturateAndDesaturate = () => {
    this.isBecomingSaturated ? this.saturate() : this.desaturate()
  }

  fillAndStroke = () => {
    const { shape, fillColor, shapeSize, hasBorders, borderColor } =
      this.squareConfig

    ctx.strokeStyle = hslStringify(borderColor)
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

  update = () => {
    const { light, hue, saturation, fillColor } = this.squareConfig

    this.fillAndStroke()

    if (light.varietyMode === "values") this.changeValueOnValuesMode("light")
    if (hue.varietyMode === "values") this.changeValueOnValuesMode("hue")
    if (saturation.varietyMode === "values")
      this.changeValueOnValuesMode("saturation")

    // If the light is ranged:
    if (light.varietyMode === "range") this.lightOnAndOff()

    // This Lights up the squares on run
    // if the light is not ranged:
    if (light.varietyMode === "value") fillColor.l = light.value
    if (this.willChangeHue && hue.varietyMode === "range") this.hueUpAndDown()
    if (this.willChangeSaturation && saturation.varietyMode === "range")
      this.saturateAndDesaturate()
  }
}
