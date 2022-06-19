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
  for (let i = 0; i < size.width / config.square.size; i++) {
    for (let j = 0; j < size.height / config.square.size; j++) {
      const newSquare = new Square(
        i * config.square.size,
        j * config.square.size,
        config.square.size,
        {
          ...config.square.fillColor,
          l: randBetween(config.square.light.min, config.square.light.max)
        },
        { ...config.square.strokeColor },
        config.square.light
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
