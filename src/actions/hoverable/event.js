// in event
export function addHoverInEventListener(source, cb) {
  source.addEventListener('mouseenter', cb)
}
export function removeHoverInEventListener(source, cb) {
  source.removeEventListener('mouseenter', cb)
}

// out event
export function addHoverOutEventListener(source, cb) {
  source.addEventListener('mouseleave', cb)
}
export function removeHoverOutEventListener(source, cb) {
  source.removeEventListener('mouseleave', cb)
}
