import { createDispatcher } from '../../utils/event'
import { getDistance } from '../../utils/math'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener,
} from './event'
import {
  TAP_DURATION_MS,
  TAP_MOVEMENT_PX,
} from '../../units'

/**
 * tappable events are for touchable devices only
 */
export function tappable(node) {
  const dispatch = createDispatcher(node)

  let tapStartedAt = 0
  let tapStartPos = { x: 0, y: 0 }

  function getIsValidTap({
    tapEndedAt,
    tapEndedPos
  }) {
    const tapTime = tapEndedAt - tapStartedAt
    const tapDist = getDistance(tapStartPos, tapEndedPos)
    return (
      tapTime <= TAP_DURATION_MS &&
      tapDist <= TAP_MOVEMENT_PX
    )
  }

  function handleTapstart(event) {
    tapStartedAt = Date.now()

    const touch = event.touches[0]
    tapStartPos = { x: touch.clientX, y: touch.clientY }

    addFocusoutEventListener(node, handleTapend)
  }

  function handleTapend(event) {
    removeFocusoutEventListener(node, handleTapend)

    const touch = event.changedTouches[0]
    if (getIsValidTap({
      tapEndedAt: Date.now(),
      tapEndedPos: { x: touch.clientX, y: touch.clientY }
    })) {
      dispatch('tapped')
    }
  }

  addFocusinEventListener(node, handleTapstart)
  
  return {
    destroy() {
      removeFocusinEventListener(node, handleTapstart)
      removeFocusoutEventListener(node, handleTapend)
    },
  }
}
