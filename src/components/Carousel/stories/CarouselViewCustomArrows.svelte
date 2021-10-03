<script>
  import Carousel from '../Carousel.svelte'

  /**
   * CSS animation timing function
   */
  export let timingFunction = 'ease-in-out';

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
   * Transition duration (ms)
   */
  export let duration = 500

  /**
   * Enables autoplay of pages
   */
  export let autoplay = false

  /**
   * Autoplay change interval
   */
  export let autoplayDuration = 3000

  /**
   * Autoplay change direction ('next', 'prev')
   */
  export let autoplayDirection = 'next'

  /**
   * Pause autoplay on focus
   */
  export let pauseOnFocus = false

  /**
   * Show autoplay duration progress indicator
   */
  export let autoplayProgressVisible = false

  /**
   * Current page indicator dots
   */
  export let dots = true

  /**
   * Enable swiping
   */
  export let swiping = true

  /**
   * Number of particles to show 
   */
  export let particlesToShow = 1

  /**
   * Number of particles to scroll 
   */
  export let particlesToScroll = 1

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
    {timingFunction}
    {arrows}
    {infinite}
    {initialPageIndex}
    {duration}
    {autoplay}
    {autoplayDuration}
    {autoplayDirection}
    {pauseOnFocus}
    {autoplayProgressVisible}
    {dots}
    {swiping}
    {particlesToShow}
    {particlesToScroll}
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
    -webkit-tap-highlight-color: transparent;
  }
</style>
