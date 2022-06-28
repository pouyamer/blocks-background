// Config Error Handle:

// - Canvas Error Handle:
if (config.canvas.size.width > innerWidth) {
  throw new Error("The canvas width is greater than the app window width")
}

if (config.canvas.size.height > innerHeight) {
  throw new Error("The canvas height is greater than the app window height")
}
