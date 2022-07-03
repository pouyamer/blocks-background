class Square {
  constructor(x, y, squareConfig) {
    const { size, light, fillColor, borderColor, hue, saturation } =
      squareConfig
    this.x = x
    this.y = y

    this.hasBorders = squareConfig.hasBorders
    this.fillColor = fillColor
    this.borderColor = borderColor
    this.size = size
    this.light = light
    this.hue = hue
    this.hueFrequncy = hue.frequancy
    this.saturation = saturation
    this.saturationFrequncy = saturation.frequancy

    // it'll be set once the app runs
    this.isLit = false

    this.willChangeHue = Math.random() < hue.frequancy
    this.willChangeSaturation = Math.random() < saturation.frequancy
    this.isTurningOn = true
    this.isHueIncreasing = true
    this.isBecomingSaturated = true
  }

  // Light Functions:
  lightOn = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { max }
    } = this.light

    this.fillColor.l += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (this.fillColor.l > max) {
      this.isTurningOn = false
      this.fillColor.l = max
    }
  }

  lightOff = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { min }
    } = this.light

    this.fillColor.l -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (this.fillColor.l < min) {
      this.isTurningOn = true
      this.fillColor.l = min
    }
  }

  lightOnAndOff = () => {
    this.isTurningOn ? this.lightOn() : this.lightOff()
  }

  // Hue Functions:

  hueUp = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { max }
    } = this.hue

    this.fillColor.h += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (this.fillColor.h > max) {
      this.isHueIncreasing = false
      this.fillColor.h = max
    }
  }

  hueDown = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { min }
    } = this.hue

    this.fillColor.h -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (this.fillColor.h < min) {
      this.isHueIncreasing = true
      this.fillColor.h = min
    }
  }

  hueUpAndDown = () => {
    this.isHueIncreasing ? this.hueUp() : this.hueDown()
  }

  saturate = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { max }
    } = this.saturation

    this.fillColor.s += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (this.fillColor.s > max) {
      this.isBecomingSaturated = false
      this.fillColor.s = max
    }
  }

  desaturate = () => {
    // If RandomlyChange is true, change the hue value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { min }
    } = this.saturation

    this.fillColor.s -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (this.fillColor.s < min) {
      this.isBecomingSaturated = true
      this.fillColor.s = min
    }
  }

  saturateAndDesaturate = () => {
    this.isBecomingSaturated ? this.saturate() : this.desaturate()
  }

  fill = () => {
    ctx.fillStyle = hslStringify(this.fillColor)
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  stroke = () => {
    ctx.strokeStyle = hslStringify(this.borderColor)
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  draw = () => {
    this.fill()
    this.hasBorders && this.stroke()
  }

  update = () => {
    this.draw()
    // If the light is ranged:
    if (this.light.isRanged) this.lightOnAndOff()

    // This Lights up the squares on run
    // if the light is not ranged:
    if (!this.light.isRanged) this.fillColor.l = this.light.value.on
    if (this.willChangeHue && this.hue.isRanged) this.hueUpAndDown()
    if (this.willChangeSaturation && this.saturation.isRanged)
      this.saturateAndDesaturate()
  }
}
