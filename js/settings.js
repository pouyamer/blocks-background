const hamburgerButton = document.querySelector(".hamburger-container")
const settingsElement = document.querySelector(".settings")
const [barTop, barMiddle, barBottom] = hamburgerButton.querySelectorAll(".bar")

const hslToRgb = hslColor => {
  const h = hslColor.h
  const s = hslColor.s / 100
  const l = hslColor.l / 100

  const C = (1 - Math.abs(2 * l - 1)) * s
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - C / 2

  const get_rPrime_gPrime_bPrime = (h, C, X) => {
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

const rgbToHsl = rgbColor => {
  const { r, g, b } = rgbColor

  const rPrime = r / 255
  const gPrime = g / 255
  const bPrime = b / 255

  const cMax = Math.max(rPrime, gPrime, bPrime)
  const cMin = Math.min(rPrime, gPrime, bPrime)

  const delta = cMax - cMin

  const calculateHue = (rPrime, gPrime, bPrime, delta) => {
    if (delta === 0) return 0
    if (rPrime === cMax) return 60 * (((gPrime - bPrime) / delta) % 6)
    if (gPrime === cMax) return 60 * ((bPrime - rPrime) / delta + 2)
    if (bPrime === cMax) return 60 * ((rPrime - gPrime) / delta + 4)
  }

  const calculateSaturation = (delta, l) => {
    return delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  }

  const hue =
    calculateHue(rPrime, gPrime, bPrime, delta) < 0
      ? 360 + calculateHue(rPrime, gPrime, bPrime, delta)
      : calculateHue(rPrime, gPrime, bPrime, delta)
  const light = (cMax + cMin) / 2
  const saturation = calculateSaturation(delta, light)

  return {
    h: hue,
    s: saturation * 100,
    l: light * 100,
    a: 1
  }
}

const invertColor = hslColor => {
  const rgbColor = hslToRgb(hslColor)
  const { r, g, b } = rgbColor
  return rgbToHsl({
    r: 255 - r,
    g: 255 - g,
    b: 255 - b
  })
}

const updateHamburgerColor = (topColor, bottomColor) => {
  const barColor = (topColor.l + bottomColor.l) / 2 > 40 ? "#000" : "#fff"

  barTop.style.backgroundColor = barColor
  barMiddle.style.backgroundColor = barColor
  barBottom.style.backgroundColor = barColor
  hamburgerButton.style.borderColor = barColor

  hamburgerButton.style.backgroundImage = `linear-gradient(
    to right, ${hslStringify(topColor)}, ${hslStringify(bottomColor)}
  )
`
}

const getTopAndBottomColor = config => {
  const { light, hue, saturation } = config.square

  const lightMinValue = light.isRanged ? light.range.min : light.value
  const hueMinValue = hue.isRanged ? hue.range.min : hue.value

  const lightMaxValue = light.isRanged ? light.range.max : light.value
  const hueMaxValue = hue.isRanged
    ? hue.range.max
    : hue.value
    ? saturation.range.max
    : saturation.value

  const topColor = invertColor({
    h: hueMinValue,
    s: 80,
    l: (lightMaxValue + lightMinValue) / 2,
    a: 1
  })

  const bottomColor = invertColor({
    h: hueMaxValue,
    s: 80,
    l: (lightMaxValue + lightMinValue) / 2,
    a: 1
  })

  return [topColor, bottomColor]
}

hamburgerButton.addEventListener("click", () => {
  settingsElement.classList.toggle("settings-open")
  hamburgerButton.classList.toggle("settings-open")
})

// Initial Run
updateHamburgerColor(...getTopAndBottomColor(config))
