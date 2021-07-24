import { createDispatcher } from '../../utils/event'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener,
} from './event'

let timeStart

export function tappable(node) {
  const dispatch = createDispatcher(node)

  function handleTapstart() {
    timeStart = Date.now()
  }

  function handleTapend() {
    const diffMs = Date.now() - timeStart
    if (diffMs <= 200) {
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
