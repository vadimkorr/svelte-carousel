import { createDispatcher } from '../../utils/event'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener,
} from './event'
import { TAP_DURATION_MS } from '../../units'

export function tappable(node) {
  const dispatch = createDispatcher(node)
  let tapStartedAt = 0

  function handleTapstart() {
    tapStartedAt = Date.now()
  }

  function handleTapend() {
    if (Date.now() - tapStartedAt <= TAP_DURATION_MS) {
      dispatch('tapped')
    }
  }

  addFocusinEventListener(node, handleTapstart)
  addFocusoutEventListener(node, handleTapend)

  return {
    destroy() {
      removeFocusinEventListener(node, handleTapstart)
      removeFocusoutEventListener(node, handleTapend)
    },
  }
}
