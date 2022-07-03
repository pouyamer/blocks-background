const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas
canvas.width = canvasSize.width
canvas.height = canvasSize.height

// An anonymous function that gets the offlight value
const lightOffColor = (() => {
  const { light, hue, fillColor, saturation } = config.square
  return {
    ...fillColor,
    l: light.isRanged ? light.range.min : light.value.off,
    h: hue.isRanged ? hue.range.min : hue.value,
    s: saturation.isRanged ? saturation.range.min : saturation.value
  }
})()

const hslStringify = color => {
  const { h, s, l, a } = color
  return `hsl(${h}, ${s}%, ${l}%, ${a})`
}
const randBetween = (min, max) => Math.random() * (max - min + 1) + min

let squares = []

// Setting the squares
const setSquares = () => {
  const { size, light, hue, fillColor, saturation } = config.square

  for (let i = 0; i < canvasSize.width / size; i++) {
    for (let j = 0; j < canvasSize.height / size; j++) {
      /* A duplicate of square config with new fillColor Value */

      const currentSquareConfig = {
        ...config.square,
        fillColor: {
          ...fillColor,
          l: light.isRanged
            ? light.defaultOnMin
              ? light.range.min
              : light.range.max
            : light.value,
          h: hue.isRanged
            ? hue.defaultOnMin
              ? hue.range.min
              : hue.range.max
            : hue.value,
          s: saturation.isRanged
            ? saturation.defaultOnMin
              ? saturation.range.min
              : saturation.range.max
            : saturation.value
        }
      }

      // Square(x, y, squareConfig)
      const newSquare = new Square(i * size, j * size, currentSquareConfig)
      newSquare.isLit = Math.random() < light.frequancy

      squares.push(newSquare)
    }
  }
}

const render = () => {
  squares
    .filter(square => (config.square.boundToLight ? square.isLit : true))
    .forEach(square => square.update())
  requestAnimationFrame(render)
}

// Main App:

//   First draw the background (It represents the light)
ctx.fillStyle = hslStringify(lightOffColor)
ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

//   set the squares
setSquares()

//   Render the squares
render()
