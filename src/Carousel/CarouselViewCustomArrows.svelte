<script>
  import Carousel from './Carousel.svelte'
  import { NEXT } from '../direction'

  /**
   * Enable Next/Previos arrows
   */
  export let arrows = true;
  
  /**
   * Infinite looping
   */
  export let infinite = true;

  /**
   * Page to start on
   */
  export let initialPageIndex = 1

  /**
   * Transition speed (ms)
   */
  export let speed = 500

  /**
   * Enables auto play of pages
   */
  export let autoplay = false

  /**
   * Auto play change interval
   */
  export let autoplaySpeed = 3000

  /**
   * Auto play change direction ('next', 'prev')
   */
  export let autoplayDirection = NEXT

  /**
   * Current page indicator dots
   */
  export let dots = true

  const colors = [
    '#e5f9f0',
    '#ccf3e2',
    '#b2edd3',
    '#99e7c5',
    '#7fe1b7',
    '#66dba8',
    '#4cd59a',
    '#32cf8b',
    '#19c97d',
    '#00c36f'
  ]
</script>

<div class="main-container">
  <Carousel
    {arrows}
    {infinite}
    {initialPageIndex}
    {speed}
    {autoplay}
    {autoplaySpeed}
    {autoplayDirection}
    {dots}
    let:showPrevPage
    let:showNextPage
  >
    {#each colors as color (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{color}</p>
      </div>
    {/each}
    <div slot="prev" class="arrow-container">
      <div class="arrow" on:click={showPrevPage}>
        <span>&lt;&lt;&lt;</span>
      </div>
    </div>
    <div slot="next" class="arrow-container">
      <div class="arrow" on:click={showNextPage}>
        <span>&gt;&gt;&gt;</span>
      </div>
    </div>
  </Carousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .color-container {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .color-container > p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    font-size: 18px;
  }

  .arrow-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .arrow {
    background-color: darkgray;
    border-radius: 5px;
    padding: 5px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }
</style>