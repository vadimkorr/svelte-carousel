export const setIntervalImmediate = (fn, ms) => {
  fn();
  return setInterval(fn, ms);
}
