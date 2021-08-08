import { NEXT, PREV } from '../../direction'
import {
  addStartEventListener,
  removeStartEventListener,
  addMoveEventListener,
  removeMoveEventListener,
  addEndEventListener,
  removeEndEventListener,
} from './event'
import { createDispatcher } from '../../utils/event'
import { SWIPE_MIN_DURATION_MS, SWIPE_MIN_DISTANCE_PX } from '../../units'

function getCoords(event) {
  if ('TouchEvent' in window && event instanceof TouchEvent) {
    const touch = event.touches[0]
    return {
      x: touch ? touch.clientX : 0,
      y: touch ? touch.clientY : 0,
    }
  }
  return {
    x: event.clientX,
    y: event.clientY,
  }
}

export function swipeable(node, { thresholdProvider }) {
  const dispatch = createDispatcher(node)
  let x
  let y
  let moved = 0
  let swipeStartedAt
  let isTouching = false

  function isValidSwipe() {
    const swipeDurationMs = Date.now() - swipeStartedAt
    return swipeDurationMs >= SWIPE_MIN_DURATION_MS && Math.abs(moved) >= SWIPE_MIN_DISTANCE_PX
  }

  function handleDown(event) {
    swipeStartedAt = Date.now()
    moved = 0
    isTouching = true
    const coords = getCoords(event)
    x = coords.x
    y = coords.y
    dispatch('swipeStart', { x, y })
    addMoveEventListener(window, handleMove)
    addEndEventListener(window, handleUp)
  }

  function handleMove(event) {
    if (!isTouching) return
    const coords = getCoords(event)
    const dx = coords.x - x
    const dy = coords.y - y
    x = coords.x
    y = coords.y
    dispatch('swipeMove', { x, y, dx, dy })

    if (dx !== 0 && Math.sign(dx) !== Math.sign(moved)) {
      moved = 0
    }
    moved += dx
    if (Math.abs(moved) > thresholdProvider()) {
      dispatch('swipeThresholdReached', { direction: moved > 0 ? PREV : NEXT })
      removeEndEventListener(window, handleUp)
      removeMoveEventListener(window, handleMove)
    }
  }

  function handleUp(event) {
    removeEndEventListener(window, handleUp)
    removeMoveEventListener(window, handleMove)

    isTouching = false

    if (!isValidSwipe()) {
      dispatch('swipeFailed')
      return
    }
    const coords = getCoords(event)
    dispatch('swipeEnd', { x: coords.x, y: coords.y })
  }

  addStartEventListener(node, handleDown)
  return {
    destroy() {
      removeStartEventListener(node, handleDown)
    },
  }
}
