<script>
  import { onMount } from 'svelte'
  import { generateId } from './utils/id'
  import { store } from './store'

  const id = generateId() 
  onMount(() => {
    store.setItem(id)
  })
</script>

{#if id === $store.currentItemId}
<slot></slot>
{/if }

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
</style>