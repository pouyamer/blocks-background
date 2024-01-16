type startingPositionType =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  // randomly from mentioned above
  | "randomFrom9Positions"
  // left and right
  | "xAxis"
  // top and bottom
  | "yAxis"
  // top-left, top-right, ...
  | "diagonal"
  // all points in the square
  | "random"
  // doesn't obey square boundaries
  | "unbound"
  // y obeys square boundaries
  | "unboundX"
  // x obeys square boundaries
  | "unboundY"
