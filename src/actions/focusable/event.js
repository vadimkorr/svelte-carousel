// focusin event
export function addFocusinEventListener(source, cb) {
  source.addEventListener('mouseenter', cb)
  source.addEventListener('touchstart', cb)
}
export function removeFocusinEventListener(source, cb) {
  source.removeEventListener('mouseenter', cb)
  source.removeEventListener('touchstart', cb)
}

// focusout event
export function addFocusoutEventListener(source, cb) {
  source.addEventListener('mouseleave', cb)
  source.addEventListener('touchend', cb)
  source.addEventListener('touchcancel', cb)
}
export function removeFocusoutEventListener(source, cb) {
  source.removeEventListener('mouseleave', cb)
  source.removeEventListener('touchend', cb)
  source.removeEventListener('touchcancel', cb)
}
