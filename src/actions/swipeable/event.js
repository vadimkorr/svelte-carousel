// start event
export function addStartEventListener(source, cb) {
  source.addEventListener('mousedown', cb)
  source.addEventListener('touchstart', cb, { passive: true })
}
export function removeStartEventListener(source, cb) {
  source.removeEventListener('mousedown', cb)
  source.removeEventListener('touchstart', cb)
}

// end event
export function addEndEventListener(source, cb) {
  source.addEventListener('mouseup', cb)
  source.addEventListener('touchend', cb)
}
export function removeEndEventListener(source, cb) {
  source.removeEventListener('mouseup', cb)
  source.removeEventListener('touchend', cb)
}

// move event
export function addMoveEventListener(source, cb) {
  source.addEventListener('mousemove', cb)
  source.addEventListener('touchmove', cb)
}
export function removeMoveEventListener(source, cb) {
  source.removeEventListener('mousemove', cb)
  source.removeEventListener('touchmove', cb)
}
