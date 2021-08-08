<script>
  import { createEventDispatcher } from 'svelte'
  import Dot from '../Dot/Dot.svelte'

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

<div class="sc-carousel-dots__container">
  {#each Array(pagesCount) as _, pageIndex (pageIndex)}
    <div class="sc-carousel-dots__dot-container">
      <Dot
        active={currentPageIndex === pageIndex}
        on:click={() => handleDotClick(pageIndex)}
      ></Dot>
    </div>
  {/each}  
</div>

<style>
  .sc-carousel-dots__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 30px;
  }
  .sc-carousel-dots__dot-container {
    height: calc(var(--sc-dot-size) + 14px);
    width: calc(var(--sc-dot-size) + 10px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
