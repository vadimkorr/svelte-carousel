export const setIntervalImmediate = (fn, ms) => {
  fn();
  return setInterval(fn, ms);
}

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
