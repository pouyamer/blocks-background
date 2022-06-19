class Square {
  constructor(x, y, squareConfig) {
    const { size, light, fillColor, strokeColor } = squareConfig
    this.x = x
    this.y = y

    this.fillColor = fillColor
    this.strokeColor = strokeColor
    this.size = size
    this.light = light

    this.isTurningOn = true
  }

  lightOn = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const { randomlyChange, step, max } = this.light

    this.fillColor.l += randomlyChange
      ? Math.random() * step.increase
      : step.increase

    if (this.fillColor.l > max) {
      this.isTurningOn = false
    }
  }

  lightOff = () => {
    // If RandomlyChange is true, change the light value on random [0 - incOrDec]
    const { randomlyChange, step, min } = this.light
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
    this.lightOnAndOff()
  }
}
