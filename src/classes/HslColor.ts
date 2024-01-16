class HslColor implements IHslColor {
  a?: number | undefined
  h: number
  s: number
  l: number
  constructor(h: number, s: number, l: number, a = 1) {
    this.h = h
    this.s = s
    this.l = l
    this.a = a
  }

  toString(): string {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`
  }
}
