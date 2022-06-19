class Square {
  constructor(x, y, size, fillColor, strokeColor, light) {
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
    this.fillColor.l += this.light.randomlyChange
      ? Math.random() * this.light.step.increase
      : this.light.step.increase

    if (this.fillColor.l > this.light.max) {
      this.isTurningOn = false
    }
  }

  lightOff() {
    this.fillColor.l -= this.light.randomlyChange
      ? Math.random() * this.light.step.decrease
      : this.light.step.decrease

    if (this.fillColor.l < this.light.min) {
      this.isTurningOn = true
    }
  }

  lightOnAndOff() {
    this.isTurningOn ? this.lightOn() : this.lightOff()
  }

  fill() {
    ctx.fillStyle = hslStringify(this.fillColor)
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  stroke() {
    ctx.strokeStyle = hslStringify(this.strokeColor)
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  draw() {
    this.fill()
    this.stroke()
  }
}
