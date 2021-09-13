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
    { color: '#e5f9f0', text: '0' },
    { color: '#ccf3e2', text: '1' },
    { color: '#b2edd3', text: '2' },
    { color: '#99e7c5', text: '3' },
    { color: '#7fe1b7', text: '4' },
    { color: '#66dba8', text: '5' },
    { color: '#4cd59a', text: '6' },
    { color: '#32cf8b', text: '7' },
    { color: '#19c97d', text: '8' },
    { color: '#00c36f', text: '9' }
  ]

  const colors2 = [
    { color: '#e5f9f0', text: '0' },
    { color: '#ccf3e2', text: '1' },
    { color: '#b2edd3', text: '2' }
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
    on:pageChange={
      event => console.log(`Current page index: ${event.detail}`)
    }
  >
    {#each colors as { color, text } (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{text}</p>
      </div>
    {/each}
  </Carousel>

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
  >
    {#each colors2 as { color, text } (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{text}</p>
      </div>
    {/each}
  </Carousel>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .color-container {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .color-container > p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    font-size: 18px;
  }
</style>
