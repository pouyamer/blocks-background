const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const { shapesize: canvasSize } = config.canvas
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
  const { shapesize, light, hue, fillColor, saturation } = config.square

  for (let i = 0; i < canvasSize.width / shapesize; i++) {
    for (let j = 0; j < canvasSize.height / shapesize; j++) {
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
        i * shapesize,
        j * shapesize,
        currentSquareConfig
      )
      newSquare.isLit = Math.random() < light.frequancy

      squares.push(newSquare)
    }
  }
}

// saves the offColor at the start of the app
const backgroundColor = hslStringify(lightOffColor)

const render = () => {
  squares
    .filter(square => !config.square.boundToLight || square.isLit)
    .forEach(square => square.update())

  // if app is paused then it stops rendering
  !paused && requestAnimationFrame(render)
}

// Main App:

//   First draw the background (It represents the light)
ctx.fillStyle = hslStringify(lightOffColor)
ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

//   set the squares
setSquares()

//   Render the squares
render()

canvas.addEventListener("click", () => {
  paused = !paused
  // if app isn't paused then it re-renders
  !paused && render()
})

window.addEventListener("resize", () => {
  canvas.width = canvasSize.width
  canvas.height = canvasSize.height
  window.location.reload()
})
