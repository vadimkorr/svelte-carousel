// tap start event
export function addFocusinEventListener(source, cb) {
  source.addEventListener('touchstart', cb, { passive: true })
}
export function removeFocusinEventListener(source, cb) {
  source.removeEventListener('touchstart', cb)
}

// tap end event
export function addFocusoutEventListener(source, cb) {
  source.addEventListener('touchend', cb)
}
export function removeFocusoutEventListener(source, cb) {
  source.removeEventListener('touchend', cb)
}
