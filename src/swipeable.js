import { NEXT, PREV } from './direction'
import {
  addStartEventListener,
  removeStartEventListener,
  addMoveEventListener,
  removeMoveEventListener,
  addEndEventListener,
  removeEndEventListener,
  createDispatcher
} from './utils/event'

function getCoords(event) {
  if (event instanceof TouchEvent) {
    const touch = event.touches[0]
    return {
      x: touch ? touch.clientX : 0,
      y: touch ? touch.clientY : 0
    }
  }
  return {
    x: event.clientX,
    y: event.clientY
  }
}

// TODO: rename to slidable
export function swipeable(node, { thresholdProvider }) {
  const dispatch = createDispatcher(node)
  let x
  let y
  let moved = 0

  function handleMousedown(event) {
    moved = 0
    const coords = getCoords(event)
    x = coords.x
    y = coords.y
    dispatch('start', { x, y })
    addMoveEventListener(window, handleMousemove)
    addEndEventListener(window, handleMouseup)
  }

  function handleMousemove(event) {
    const coords = getCoords(event)
    const dx = coords.x - x
    const dy = coords.y - y
    x = coords.x
    y = coords.y
    dispatch('move', { x, y, dx, dy })

    if (dx !== 0 && Math.sign(dx) !== Math.sign(moved)) {
      moved = 0
    }
    moved += dx
    if (Math.abs(moved) > thresholdProvider()) {
      dispatch('threshold', { direction: moved > 0 ? PREV : NEXT })
      removeEndEventListener(window, handleMouseup)
      removeMoveEventListener(window, handleMousemove)
    } 
  }

  function handleMouseup(event) {
    const coords = getCoords(event)
    x = coords.x
    y = coords.y
    dispatch('end', { x, y })
    removeEndEventListener(window, handleMouseup)
    removeMoveEventListener(window, handleMousemove)
  }

  addStartEventListener(node, handleMousedown)
  return {
    destroy() {
      removeStartEventListener(node, handleMousedown)
    }
  }
}
