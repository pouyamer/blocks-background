const canvas = document.querySelector(".canvas") as HTMLCanvasElement
const elWarning = document.querySelector(".warning") as HTMLDivElement
const elBtnAgreeWarning = document.querySelector(
  ".btn-agree-warning"
) as HTMLButtonElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const { size: canvasSize, clearAfterEachFrame } = config.canvas
canvas.width = canvasSize.width
canvas.height = canvasSize.height

let paused = false

const { offColor: _offColor, tileSize } = config.tile

const offColor = new HslColor(
  _offColor.h,
  _offColor.s,
  _offColor.l,
  _offColor.a
)

let tiles: Tile[] = []

// Setting the tiles
const setTiles = () => {
  for (let i = 0; i < canvasSize.width / tileSize; i++) {
    for (let j = 0; j < canvasSize.height / tileSize; j++) {
      /* A duplicate of square config with new fillColor Value */

      // Tile(x, y, squareConfig)
      const newTile = new Tile(i * tileSize, j * tileSize, config, i, j)

      tiles.push(newTile)
    }
  }
}

// saves the offColor at the start of the app
const backgroundColor = offColor.toString()

let totalFrames = 0
let time = 0

let timeElapsedInterval = setInterval(() => {
  time += 0.1
}, 100)
const render = () => {
  if (clearAfterEachFrame) {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    //   First draw the background (It represents the light)
    ctx.fillStyle = offColor.toString()
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
  }

  tiles
    .filter(
      square => !square.tileConfig.boundToLight || square.tileConfig.isLit
    )
    .forEach(square => square.update(ctx))

  // Show frame rate:
  if (config.accessibility.showFramesPerSecond) {
    ctx.fillStyle = "#222"
    ctx.fillRect(canvasSize.width - 110, 0, 120, 40)
    ctx.fillStyle = "#fff"
    ctx.font = "30px Arial"

    ctx.fillText(
      Math.round((totalFrames / time) | 0) + " FPS",
      canvasSize.width - 100,
      30
    )
    totalFrames++
  }

  !paused && requestAnimationFrame(render)
}

// Main App:
//   First draw of background
ctx.fillStyle = offColor.toString()
ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

//    If !config.accessibility.warning hide warning (NOT RECOMMENDED)
!config.accessibility.warning && elWarning.remove()

//    If user clicks on continue warning will go away
elBtnAgreeWarning.addEventListener("click", async () => {
  const { warningFadeOutDuration } = config.accessibility

  // adds the removed class

  await new Promise((res: Function) => {
    elWarning.classList.add("removed")
    elWarning.style.transitionDuration = warningFadeOutDuration + "ms"
    res()
  })

  // waits for the fade-out to finish
  await new Promise((res: Function) => {
    setTimeout(() => {
      res()
    }, warningFadeOutDuration)
  })

  // removes the element from the DOM
  await new Promise((res: Function) => {
    elWarning.remove()
    res()
  })
})

//   set the tiles
setTiles()

//   Render the tiles
render()

canvas.addEventListener("click", () => {
  paused = !paused

  // Reset the timer and frames
  if (paused) {
    totalFrames = 0
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

window.addEventListener("resize", () => {})
