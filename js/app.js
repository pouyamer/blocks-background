const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { size: canvasSize } = config.canvas
canvas.width = canvasSize.width
canvas.height = canvasSize.height

let paused = false

// An anonymous function that gets the offlight value
const lightOffColor = (() => {
  const { light, hue, saturation, fillColor } = config.square
  const setLightOffValue = colorValue => {
    // colorValue is l, h, or s
    switch (colorValue.varietyMode) {
      case "value":
        return colorValue.value
      case "range":
        return colorValue.defaultOnMin
          ? colorValue.range.min
          : colorValue.range.max
      case "values":
        return Math.min(...colorValue.values)
    }
  }

  return {
    ...fillColor,
    l: setLightOffValue(light),
    h: setLightOffValue(hue),
    s: setLightOffValue(saturation)
  }
})()

let squares = []

// Setting the squares
const setSquares = () => {
  const { shapeSize, light, hue, fillColor, saturation } = config.square

  for (let i = 0; i < canvasSize.width / shapeSize; i++) {
    for (let j = 0; j < canvasSize.height / shapeSize; j++) {
      /* A duplicate of square config with new fillColor Value */

      const currentSquareConfig = {
        ...config.square,
        fillColor: {
          ...fillColor,
          l:
            light.varietyMode === "range"
              ? light.defaultOnMin
                ? light.range.min
                : light.range.max
              : light.value,
          h:
            hue.varietyMode === "range"
              ? hue.defaultOnMin
                ? hue.range.min
                : hue.range.max
              : hue.value,
          s:
            saturation.varietyMode === "range"
              ? saturation.defaultOnMin
                ? saturation.range.min
                : saturation.range.max
              : saturation.value
        }
      }

      // Square(x, y, squareConfig)
      const newSquare = new Square(
        i * shapeSize,
        j * shapeSize,
        currentSquareConfig
      )
      newSquare.isLit = Math.random() < light.frequancy

      squares.push(newSquare)
    }
  }
}

// saves the offColor at the start of the app
const backgroundColor = hslStringify(lightOffColor)

let frames = 0
let time = 0

let timeElapsedInterval = setInterval(() => {
  time += 0.1
}, 100)

const render = () => {
  squares
    .filter(square => !config.square.boundToLight || square.isLit)
    .forEach(square => square.update())

  // Show frame rate:
  ctx.fillStyle = "#222"
  ctx.fillRect(canvasSize.width - 110, 0, 120, 40)
  ctx.fillStyle = "#fff"
  ctx.font = "30px Arial"
  ctx.fillText(
    Math.round((frames / time) | 0) + " FPS",
    canvasSize.width - 100,
    30
  )
  frames++

  // if app is paused then it stops rendering
  !paused && requestAnimationFrame(render)
}

// Main App:

//   First draw the background (It represents the light)
ctx.fillStyle = hslStringify(lightOffColor)\
ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

//   set the squares
setSquares()

//   Render the squares
render()

canvas.addEventListener("click", () => {
  paused = !paused

  // Reset the timer and frames
  if (paused) {
    frames = 0
    time = 0
    clearInterval(timeElapsedInterval)
  } else {
    timeElapsedInterval = setInterval(() => {
      time += 0.1
    }, 100)
  }

  // if app isn't paused then it re-renders
  !paused && render()
})

window.addEventListener("resize", () => {
  canvas.width = canvasSize.width
  canvas.height = canvasSize.height
  window.location.reload()
})
