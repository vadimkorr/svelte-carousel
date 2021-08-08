import { createDispatcher } from '../../utils/event'
import { get } from '../../utils/object'
import {
  addFocusinEventListener,
  removeFocusinEventListener,
  addFocusoutEventListener,
  removeFocusoutEventListener
} from './event'

/**
 * focusable events are for mouse events only
 */
export function focusable(node, options) {
  // pass custom dispatch fn in order to re-translate dispatched event
  const dispatch = get(options, 'dispatch', createDispatcher(node))

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
