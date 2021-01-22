<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  /**
   * Amount of pages (amount of dots)
   */
  export let pagesCount = 1

  /**
   * Index of the current page
   */
  export let currentPageIndex = 0

  function handleDotClick(pageIndex) {
    dispatch('pageChange', pageIndex)
  }
</script>

<div class="main-container">
  {#each Array(pagesCount) as _, pageIndex}
    <div class="dot-container">
      <div
        class="dot"
        class:current="{currentPageIndex === pageIndex}"
        on:click={() => handleDotClick(pageIndex)}
      ></div>
    </div>
  {/each}  
</div>

<style>
  :root {
    --dot-size: 10px; 
  }
  .main-container {
    display: flex;
    align-items: center;
  }
  .dot-container {
    height: calc(var(--dot-size) + 10px);
    width: calc(var(--dot-size) + 10x);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dot {
    height: var(--dot-size);
    width: var(--dot-size);
    background-color: #aaa;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
    margin: 3px;
    cursor: pointer;
  }
  .dot:hover {
    opacity: 0.9;
  }
  .current {
    height: calc(var(--dot-size) + 3px);
    width: calc(var(--dot-size) + 3px);
    opacity: 0.7;
  }
</style>