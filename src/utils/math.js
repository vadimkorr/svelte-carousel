export const getDistance = (p1, p2) => {
  const xDist = p2.x - p1.x;
  const yDist = p2.y - p1.y;

  return Math.sqrt((xDist * xDist) + (yDist * yDist));
}
