<script>
  // TODO: rename image carousel to just carousel
  import { onMount } from 'svelte'
  import { store } from './store'

  /**
   * Enable Next/Prev arrows
   */
  export let arrows = true;
  
  let contentContainerElement
  let children
  onMount(() => {
    children = contentContainerElement.children
  })

  function handlePrevClick() {
    store.prev()
  }
  function handleNextClick() {
    store.next()
  }
</script>

<div class="main-container">
  {#if arrows}
  <div class="side-container">
    <span
      class="clickable"
      on:click={handlePrevClick}
    >&lt;</span>
  </div>
  {/if}
  <div class="content-container" bind:this={contentContainerElement}>
    <slot></slot>
  </div>
  {#if arrows}
  <div class="side-container">
    <span
      class="clickable"
      on:click={handleNextClick}
    >&gt;</span>
  </div>
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .content-container {
    flex: 1;
    display: flex;
  }
  .side-container {
    background-color: cornflowerblue;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .clickable {
    cursor: pointer;
  }
</style>