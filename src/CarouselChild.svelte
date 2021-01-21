<script>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition';
  import { custom } from './transition'

  import { generateId } from './utils/id'
  import { store } from './store'

  let container
  const id = generateId() 
  onMount(() => {
    store.setItem(id)
    // console.log(container)
    return () => {
      store.removeItem(id)
    }
  })

  let isActive = false
  $: {
    isActive = id === $store.currentItemId
    // console.log(container && container.clientWidth)
    // if (container) container.style.left = `${-container.clientWidth + 50}px`
  }

  const getW = () => {
    return container && container.clientWidth || 0
  }
</script>

<div
  bind:this={container}
  class="main-container"
>
  <slot></slot>
</div>

<style>
  .main-container {
    background-color: darkgrey;
  }
</style>
