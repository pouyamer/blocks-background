const hamburgerButton = document.querySelector(".hamburger-container")
const settingsElement = document.querySelector(".settings")
const [hueBarContainer] = document.querySelectorAll(".bar-container")
const [hueBar] = document.querySelectorAll(".bar")
const [barTop, barMiddle, barBottom] =
  hamburgerButton.querySelectorAll(".hamburger-bar")

let hueBarMaxIsChanging = document.querySelector(".hue-bar-max-is-changing")
let hueBarMinIsChanging = false

let unsavedConfig = {
  ...config
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

const updateBar = (barContainer, minValue, maxValue) => {
  // Updating color of the bar
  const bar = barContainer.querySelector(".bar")

  // setting the grid template columns
  bar.style.gridTemplateColumns = `${minValue}fr ${maxValue - minValue}fr ${
    360 - maxValue
  }fr`

  // setting the color of the bar
  const gradientText = `linear-gradient( to right, ${Array(20)
    .fill()
    .map((_, i) =>
      hslStringify({
        h:
          barContainer === hueBarContainer
            ? minValue + (i * (maxValue - minValue)) / 20
            : 30,
        s:
          // barContainer === saturationBarContainer
          false ? minValue + (i * (maxValue - minValue)) / 20 : 80,
        l:
          // barContainer === lightBarContainer
          false ? minValue + (i * (maxValue - minValue)) / 20 : 60,
        a: 1
      })
    )
    .join(", ")} )`

  bar.querySelector(".selected").style.backgroundImage = gradientText

  // setting the min and max hue values in the inputs
  const min = barContainer.querySelector(".min")
  const max = barContainer.querySelector(".max")

  min.value = minValue
  max.value = maxValue
}

hamburgerButton.addEventListener("click", () => {
  settingsElement.classList.toggle("settings-open")
  hamburgerButton.classList.toggle("settings-open")
})

hueBar.addEventListener("mousemove", e => {
  // get the clicked position
  const x = e.offsetX
  // get the relative position (0 - 1)
  const relativeX = x / hueBar.offsetWidth
  const chosenHue = relativeX * 360

  console.log(chosenHue)
  if (hueBarMinIsChanging) {
    const minHue = chosenHue
    const maxHue = 360

    updateBar(hueBarContainer, minHue, maxHue)
  }
})

// Initial Run
updateHamburgerColor(...getTopAndBottomColor(config))
updateBar(
  hueBarContainer,
  unsavedConfig.square.hue.range.min,
  unsavedConfig.square.hue.range.max
)
