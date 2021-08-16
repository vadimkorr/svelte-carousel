// resize event
export function addResizeEventListener(cb) {
  window.addEventListener('resize', cb)
}
export function removeResizeEventListener(cb) {
  window.removeEventListener('resize', cb)
}

export function createDispatcher(source) {
  return function (event, data) {
    source.dispatchEvent(
      new CustomEvent(event, {
        detail: data,
      })
    )
  }
}
