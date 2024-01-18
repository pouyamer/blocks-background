const hslToRgb = (hslColor: IHslColor) => {
  const h = hslColor.h
  const s = hslColor.s / 100
  const l = hslColor.l / 100

  const C = (1 - Math.abs(2 * l - 1)) * s
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - C / 2

  const get_rPrime_gPrime_bPrime = (h: number, C: number, X: number) => {
    if (h >= 0 && h < 60) return [C, X, 0]
    if (h < 120) return [X, C, 0]
    if (h < 180) return [0, C, X]
    if (h < 240) return [0, X, C]
    if (h < 300) return [X, 0, C]
    return [C, 0, X]
  }

  const [rPrime, gPrime, bPrime] = get_rPrime_gPrime_bPrime(h, C, X)

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255)
  }
}

const hslStringify = (color: IHslColor) => {
  const { h, s, l, a } = color
  return `hsl(${h}, ${s}%, ${l}%, ${a})`
}

const randBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const willMakeTriangle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) => {
  const side1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const side2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2))
  const side3 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2))

  return side1 + side2 < side3 && side2 + side3 < side1 && side1 + side3 < side2
}

const getPixelHSLArray = (scannedImage: ImageData) => {
  const rgbvaluesLength = scannedImage.data.length

  let pixelsArray: Pixel[] = []
  let red = 0
  let green = 0
  let blue = 0
  let alpha = 0

  for (let i = 0; i < rgbvaluesLength; i++) {
    if ((i + 1) % 4 === 0) {
      alpha = scannedImage.data[i]
      const x = (i / 4) % canvas.width
      const y = Math.round(i / 4 / canvas.height)

      const pixel = new Pixel(
        x,
        y,
        new RgbColor(red, green, blue, alpha).toHsl()
      )

      pixelsArray.push(pixel)
    }
    if ((i + 1) % 4 === 1) {
      red = scannedImage.data[i]
    }
    if ((i + 1) % 4 === 2) {
      green = scannedImage.data[i]
    }

    if ((i + 1) % 4 === 3) {
      blue = scannedImage.data[i]
    }
  }

  return pixelsArray
}
