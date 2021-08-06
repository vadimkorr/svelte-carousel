import { createDispatcher } from '../../utils/event'
import { get } from '../../utils/object'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener,
} from './event'
import { TAP_DURATION_MS } from '../../units'

/**
 * tappable events are for touchable devices only
 */
export function tappable(node, options) {
  // pass custom dispatch fn in order to re-translate dispatched event
  const dispatch = get(options, 'dispatch', createDispatcher(node))

  let tapStartedAt = 0

  function handleTapstart() {
    tapStartedAt = Date.now()
    addFocusoutEventListener(node, handleTapend)
  }

  function handleTapend() {
    removeFocusoutEventListener(node, handleTapend)
    if (Date.now() - tapStartedAt <= TAP_DURATION_MS) {
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
