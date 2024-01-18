interface ITileConfig {
  fillColor: HslColor
  boundToLight: boolean
  tileSize: number
  hasBorders: boolean
  innerShape: InnerShapeType
  borderColor?: HslColor
  willChangeHue: boolean
  willChangeSaturation: boolean
  isTurningOn: boolean
  isHueIncreasing: boolean
  isBecomingSaturated: boolean
  isLit: boolean
}
