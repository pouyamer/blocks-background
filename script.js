const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { canvasSize: size } = config
canvas.width = size.width
canvas.height = size.height

const hslStringify = color => {
  const { h, s, l, a } = color
  return `hsl(${h}, ${s}%, ${l}%, ${a})`
}

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

let squares = []

// Setting the squares
const setSquares = () => {
  const { size: squareSize, light, fillColor, strokeColor } = config.square

  for (let i = 0; i < size.width / squareSize; i++) {
    for (let j = 0; j < size.height / squareSize; j++) {
      const squareFillColor = {
        ...fillColor,
        l: randBetween(light.min, light.max)
      }

      const squareConfig = {
        ...config,
        square: {
          ...config.square,
          fillColor: squareFillColor
        }
      }

      const newSquare = new Square(
        i * squareSize,
        j * squareSize,
        squareSize,
        squareFillColor,
        strokeColor,
        light
      )

      squares.push(newSquare)
    }
  }
}

setSquares()

const render = () => {
  ctx.clearRect(0, 0, size.width, size.height)
  squares.forEach(square => square.lightOnAndOff())
  squares.forEach(square => square.draw())
  requestAnimationFrame(render)
}

// Main App:
render()
