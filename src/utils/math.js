export const getDistance = (p1, p2) => {
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;

  return Math.sqrt((x * x) + (y * y));
}
