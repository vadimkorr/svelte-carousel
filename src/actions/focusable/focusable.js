import { createDispatcher } from '../../utils/event'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener,
} from './event'

export function focusable(node) {
  const dispatch = createDispatcher(node)

  function handleFocusin() {
    dispatch('focused', { value: true })
  }

  function handleFocusout() {
    dispatch('focused', { value: false })
  }

  addFocusinEventListener(node, handleFocusin)
  addFocusoutEventListener(node, handleFocusout)

  return {
    destroy() {
      removeFocusinEventListener(node, handleFocusin)
      removeFocusoutEventListener(node, handleFocusout)
    },
  }
}
