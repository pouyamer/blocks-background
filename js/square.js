class Square {
  constructor(x, y, squareConfig) {
    const { size, light, fillColor, borderColor, hue } = squareConfig
    this.x = x
    this.y = y

    this.hasBorders = squareConfig.hasBorders
    this.fillColor = fillColor
    this.borderColor = borderColor
    this.size = size
    this.light = light
    this.hue = hue
    this.lightFrequncy = light.frequancy
    this.hueFrequncy = hue.frequancy

    this.willChangeLight = Math.random() < light.frequancy
    this.willChangeHue = Math.random() < hue.frequancy
    this.isTurningOn = true
    this.isHueIncreasing = true
  }

  // Light Functions:
  lightOn = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { max },
      value
    } = this.light

    this.fillColor.l += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (this.fillColor.l > max) {
      this.isTurningOn = false
      this.fillColor.l = this.isRanged ? max : value.on
    }
  }

  lightOff = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const {
      randomlyChange,
      step,
      range: { min },
      value
    } = this.light

    this.fillColor.l -= randomlyChange
      ? Math.random() * step.decrease
      : step.decrease

    if (this.fillColor.l < min) {
      this.isTurningOn = true
      this.fillColor.l = this.isRanged ? min : value.off
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
      range: { min },
      value
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
    ctx.strokeStyle = hslStringify(this.borderColor)
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  draw = () => {
    this.fill()
    this.hasBorders && this.stroke()
  }

  update = () => {
    this.draw()
    if (this.willChangeLight) {
      // If the light is ranged:
      if (this.light.isRanged) this.lightOnAndOff()

      // This Lights up the squares on run
      // if the light is not ranged:
      if (!this.light.isRanged && this.isTurningOn) this.lightOn()

      if (this.willChangeHue && this.hue.isRanged) this.hueUpAndDown()
    }
  }
}
