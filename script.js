const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { canvasSize } = config
canvas.width = canvasSize.width
canvas.height = canvasSize.height

const hslStringify = color => {
  const { h, s, l, a } = color
  return `hsl(${h}, ${s}%, ${l}%, ${a})`
}

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

let squares = []

// Setting the squares
const setSquares = () => {
  const { size, light, fillColor } = config.square

  for (let i = 0; i < canvasSize.width / size; i++) {
    for (let j = 0; j < canvasSize.height / size; j++) {
      /* current square have its light value 
         randomised based on max and min of light value
          in the config */
      const newRandomizedFillColor = {
        ...fillColor,
        l: randBetween(light.min, light.max)
      }

      /* A duplicate of square config with new fillColor Value */
      const currentSquareConfig = {
        ...config.square,
        fillColor: newRandomizedFillColor
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
