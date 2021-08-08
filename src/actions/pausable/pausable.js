import {
  createDispatcher,
  getIsTouchable,
} from '../../utils/event'

import { focusable } from '../focusable'
import { tappable } from '../tappable'

export function pausable(node) {
  const dispatch = createDispatcher(node)

  if (getIsTouchable()) {
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
