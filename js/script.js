const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas
canvas.width = canvasSize.width
canvas.height = canvasSize.height

const hslStringify = color => {
  const { h, s, l, a } = color
  return `hsl(${h}, ${s}%, ${l}%, ${a})`
}

const randBetween = (min, max) => Math.random() * (max - min + 1) + min

let squares = []

// Setting the squares
const setSquares = () => {
  const { size, light, hue, fillColor } = config.square

  for (let i = 0; i < canvasSize.width / size; i++) {
    for (let j = 0; j < canvasSize.height / size; j++) {
      // Ranged values that go into effect if their respective
      // isRanged is set to "true"
      const newRandomizedLight = randBetween(light.range.min, light.range.max)
      const newRandomizedHue = randBetween(hue.range.min, hue.range.max)

      /* A duplicate of square config with new fillColor Value */
      const currentSquareConfig = {
        ...config.square,
        fillColor: {
          ...fillColor,
          l: light.isRanged ? newRandomizedLight : light.value,
          h: hue.isRanged ? newRandomizedHue : hue.value
        }
      }

      // Square(x, y, squareConfig)
      const newSquare = new Square(i * size, j * size, currentSquareConfig)

      squares.push(newSquare)
    }
  }
}

const render = () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
  squares.forEach(square => square.update())
  requestAnimationFrame(render)
}

// Main App:
setSquares()
render()
