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

export function getIsTouchable() {
  return (
    // ('ontouchstart' in window) || // not changing value during browser view switching (mobile <-> desktop)
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  )
}

export function addTouchableChangeEventListener(cb) {
  let isTouchable = getIsTouchable();
  cb(isTouchable)

  function handleResize() {
    const isTouchableNext = getIsTouchable();
    if (isTouchable !== isTouchableNext) {
      cb(isTouchableNext)
      isTouchable = isTouchableNext
    }
  }

  addResizeEventListener(handleResize)
  return () => {
    removeResizeEventListener(handleResize)
  }
}
