interface ISquareConfig {
  fillColor: HslColor
  boundToLight: boolean
  shapeSize: number
  hasBorders: boolean
  shape: ShapeType
  borderColor?: HslColor
  willChangeHue: boolean
  willChangeSaturation: boolean
  isTurningOn: boolean
  isHueIncreasing: boolean
  isBecomingSaturated: boolean
  isLit: boolean
}
