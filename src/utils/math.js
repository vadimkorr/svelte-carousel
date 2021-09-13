export const getDistance = (p1, p2) => {
  const xDist = p2.x - p1.x;
  const yDist = p2.y - p1.y;

  return Math.sqrt((xDist * xDist) + (yDist * yDist));
}

export function getValueInRange(min, value, max) {
  return Math.max(min, Math.min(value, max))
}
