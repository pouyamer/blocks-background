interface ISquareConfig {
  fillColor: IHslColor
  boundToLight: boolean
  shapeSize: number
  hasBorders: boolean
  shape: ShapeType
  borderColor?: IHslColor
  willChangeHue: boolean
  willChangeSaturation: boolean
  isTurningOn: boolean
  isHueIncreasing: boolean
  isBecomingSaturated: boolean
  isLit: boolean
}
