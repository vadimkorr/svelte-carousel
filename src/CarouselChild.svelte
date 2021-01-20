<script>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition';

  import { generateId } from './utils/id'
  import { store } from './store'

  const id = generateId() 
  onMount(() => {
    store.setItem(id)
    return () => {
      store.removeItem(id)
    }
  })
</script>

{#if id === $store.currentItemId}
<div
  class="main-container"
  in:fly="{{ x: 200, duration: 200, delay: 200 }}"
  out:fly="{{ x: -200, duration: 200 }}"
>
  <slot></slot>
</div>
{/if }

<style>
  .main-container {
    width: 100%;
  }
</style>
