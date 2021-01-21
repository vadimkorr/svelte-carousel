import { cubicIn } from 'svelte/easing';
 
export function custom(node, { duration, offset }) {
  console.log(node.style.left)
  return {
    duration,
    css: t => {
      const eased = cubicIn(t);
      // console.log(Math.round(offset/t))
      // transform: translate(${Math.round(offset/t)}px);
      return `
        transform: translate(${Math.round(offset/t)}px);
      `
    }
  };
}
