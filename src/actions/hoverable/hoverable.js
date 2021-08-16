import { createDispatcher } from '../../utils/event'
import {
  addHoverInEventListener,
  removeHoverInEventListener,
  addHoverOutEventListener,
  removeHoverOutEventListener
} from './event'

/**
 * hoverable events are for mouse events only
 */
export function hoverable(node) {
  const dispatch = createDispatcher(node)

  function handleHoverIn() {
    addHoverOutEventListener(node, handleHoverOut)
    dispatch('hovered', { value: true })
  }

  function handleHoverOut() {
    dispatch('hovered', { value: false })
    removeHoverOutEventListener(node, handleHoverOut)
  }

  addHoverInEventListener(node, handleHoverIn)
  
  return {
    destroy() {
      removeHoverInEventListener(node, handleHoverIn)
      removeHoverOutEventListener(node, handleHoverOut)
    },
  }
}
