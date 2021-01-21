<script>
  // TODO: rename image carousel to just carousel
  import { onMount } from 'svelte'
  import { store } from './store'

  /**
   * Enable Next/Prev arrows
   */
  export let arrows = true;

  /**
   * Infinite looping
   */
  export let infinite	= true;
  
  let contentContainerElement
  let innerContentContainerElement
  let children
  let w = 0
  onMount(() => {
    children = innerContentContainerElement.children
    console.log('children', children.length)
    w = contentContainerElement.clientWidth
    for (let i=0; i<children.length; i++) {
      store.setItem()
    }
  })

  let offset
  function handlePrevClick() {
    store.prev({ infinite })
    offset = -$store.currentItemIndex * children[$store.currentItemIndex].clientWidth
  }
  function handleNextClick() {
    store.next({ infinite })
    console.log('currentItemId', $store.currentItemId)
    offset = -$store.currentItemIndex * children[$store.currentItemIndex].clientWidth
    console.log('offset', offset, children[$store.currentItemIndex].clientWidth)
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
  <div
    class="content-container"
    bind:this={contentContainerElement}
  >
    <div
      style="transform: translateX({offset}px);"
      bind:this={innerContentContainerElement}
    >
      <slot></slot>
    </div>
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
    overflow: hidden;
  }
  .content-container > div {
    display: flex;
    transition: transform 1s ease-in-out;
    background-color: chocolate;
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