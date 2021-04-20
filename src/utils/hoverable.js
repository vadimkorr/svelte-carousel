import { createDispatcher } from './event'

export function hoverable(node) {
  const dispatch = createDispatcher(node)

  function handleMouseenter() {
    dispatch('hovered', { value: true })

    // node.addEventListener('mouseleave', handleMouseleave)
    // node.addEventListener('touchend', handleMouseleave)
    // node.addEventListener('touchcancel', handleMouseleave)
  }

  function handleMouseleave() {
    dispatch('hovered', { value: false })

    // node.removeEventListener('mouseleave', handleMouseleave)
    // node.removeEventListener('touchend', handleMouseleave)
    // node.removeEventListener('touchcancel', handleMouseleave)
  }

  node.addEventListener('mouseenter', handleMouseenter)
  node.addEventListener('touchstart', handleMouseenter)

  node.addEventListener('mouseleave', handleMouseleave)
  node.addEventListener('touchend', handleMouseleave)
  node.addEventListener('touchcancel', handleMouseleave)

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter)
      node.removeEventListener('touchstart', handleMouseenter)

      node.removeEventListener('mouseleave', handleMouseleave)
      node.removeEventListener('touchend', handleMouseleave)
      node.removeEventListener('touchcancel', handleMouseleave)
    },
  }
}
