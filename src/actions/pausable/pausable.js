import {
  addTouchableChangeEventListener,
  createDispatcher,
} from '../../utils/event'
import { focusable } from '../focusable'
import { tappable } from '../tappable'

function getHandler(isTouchable, node) {
  const dispatch = createDispatcher(node)
  
  if (isTouchable) {
    return tappable(node, {
      dispatch: (_, payload) => {
        dispatch('pausedToggle', {
          isTouchable: true,
          ...payload
        })
      }
    })
  }
  return focusable(node, {
    dispatch: (_, payload) => {
      dispatch('pausedToggle', {
        isTouchable: false,
        ...payload
      })
    }
  })
}

export function pausable(node) {
  let destroy

  const handleTouchableChange = (isTouchable) => {
    destroy && destroy() // destroy when touchable changed
    destroy = getHandler(isTouchable, node).destroy
  }

  // in order to change handlers when browser was switched to mobile view and vice versa
  const removeTouchableChangeListener = addTouchableChangeEventListener(handleTouchableChange)
  return {
    destroy() {
      removeTouchableChangeListener()
      destroy() // destroy here in case if touchable was not changed
    }
  }
}
