class Square {
  constructor(x, y, squareConfig) {
    const { size, light, fillColor, strokeColor, hue } = squareConfig
    this.x = x
    this.y = y

    this.fillColor = fillColor
    this.strokeColor = strokeColor
    this.size = size
    this.light = light
    this.hue = hue

    this.isTurningOn = true
    this.isHueIncreasing = true
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
    }
  }

  hueUpAndDown = () => {
    this.isHueIncreasing ? this.hueUp() : this.hueDown()
  }

  fill = () => {
    ctx.fillStyle = hslStringify(this.fillColor)
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  stroke = () => {
    ctx.strokeStyle = hslStringify(this.strokeColor)
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  draw = () => {
    this.fill()
    this.stroke()
  }

  update = () => {
    this.draw()
    if (this.light.isRanged) this.lightOnAndOff()
    if (this.hue.isRanged) this.hueUpAndDown()
  }
}
