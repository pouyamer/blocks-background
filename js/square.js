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

  fill = () => {
    const { shape, fillColor, shapesize } = this.squareConfig

    ctx.fillStyle = hslStringify(fillColor)

    if (shape === "bowlingPin" || shape === "square") {
      ctx.fillRect(this.x, this.y, shapesize, shapesize)
    }

    if (shape === "bowlingPin" || shape === "circle") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, shapesize * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  stroke = () => {
    const { shape, borderColor, shapesize } = this.squareConfig
    ctx.strokeStyle = hslStringify(borderColor)

    if (shape === "circle") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, shapesize * 0.5, 0, Math.PI * 2)
      ctx.stroke()
      return
    }

    if (shape === "square") {
      ctx.strokeRect(this.x, this.y, shapesize, shapesize)
      return
    }

    if (shape === "bowlingPin") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, shapesize * 0.5, 0.5 * Math.PI, Math.PI * 2)
      ctx.lineTo(this.x + shapesize, this.y)
      ctx.lineTo(this.x + shapesize, this.y + shapesize)
      ctx.lineTo(this.x, this.y + shapesize)
      ctx.lineTo(this.x, this.y + shapesize * 0.5)
      ctx.stroke()
    }
  }

  draw = () => {
    const { hasBorders } = this.squareConfig
    this.fill()
    hasBorders && this.stroke()
  }

  update = () => {
    const { light, hue, saturation, fillColor } = this.squareConfig

    this.draw()
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
