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
    const { mode, fillColor, size } = this.squareConfig

    ctx.fillStyle = hslStringify(fillColor)

    if (mode === "bowlingPin" || mode === "square") {
      ctx.fillRect(this.x, this.y, size, size)
    }

    if (mode === "bowlingPin" || mode === "circle") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, size * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  stroke = () => {
    const { mode, borderColor, size } = this.squareConfig
    ctx.strokeStyle = hslStringify(borderColor)

    if (mode === "circle") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, size * 0.5, 0, Math.PI * 2)
      ctx.stroke()
      return
    }

    if (mode === "square") {
      ctx.strokeRect(this.x, this.y, size, size)
      return
    }

    if (mode === "bowlingPin") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, size * 0.5, 0.5 * Math.PI, Math.PI * 2)
      ctx.lineTo(this.x + size, this.y)
      ctx.lineTo(this.x + size, this.y + size)
      ctx.lineTo(this.x, this.y + size)
      ctx.lineTo(this.x, this.y + size * 0.5)
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
    if (light.isRanged) this.lightOnAndOff()

    // This Lights up the squares on run
    // if the light is not ranged:
    if (!light.isRanged) fillColor.l = light.value.on
    if (this.willChangeHue && hue.isRanged) this.hueUpAndDown()
    if (this.willChangeSaturation && saturation.isRanged)
      this.saturateAndDesaturate()
  }
}
