import { createDispatcher } from '../../utils/event'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener
} from './event'

/**
 * focusable events are for mouse events only
 */
export function focusable(node) {
  const dispatch = createDispatcher(node)

  function handleFocusin() {
    addFocusoutEventListener(node, handleFocusout)
    dispatch('focused', { value: true })
  }

  function handleFocusout() {
    dispatch('focused', { value: false })
    removeFocusoutEventListener(node, handleFocusout)
  }

  addFocusinEventListener(node, handleFocusin)
  
  return {
    destroy() {
      removeFocusinEventListener(node, handleFocusin)
      removeFocusoutEventListener(node, handleFocusout)
    },
  }
}
