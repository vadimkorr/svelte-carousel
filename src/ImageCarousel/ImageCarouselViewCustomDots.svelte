<script>
  import ImageCarousel from './ImageCarousel.svelte'

  /**
   * Enable Next/Previos arrows
   */
  export let arrows = true;
  
  /**
   * Infinite looping
   */
  export let infinite = true;

  /**
   * Number of slides to show at a time
   */
  export let slidesToShow = 1;

  /**
   * Page to start on
   */
  export let initialPage = 1

  /**
   * Transition speed (ms)
   */
  export let speed = 500

  /**
   * Enables auto play of slides
   */
  export let autoplay = false

  /**
   * Auto play change interval
   */
  export let autoplaySpeed = 3000

  /**
   * Auto play change direction ('next', 'prev')
   */
  export let autoplayDirection = 'next'

  /**
   * Current page indicator dots
   */
  export let dots = true

  function onPageChange(event, showPage) {
    showPage(event.target.value)
  }

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
  <ImageCarousel
    {arrows}
    {infinite}
    {slidesToShow}
    {initialPage}
    {speed}
    {autoplay}
    {autoplaySpeed}
    {autoplayDirection}
    {dots}
    let:currentPage
    let:pagesCount
    let:showPage
  >
    {#each colors as color (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{color}</p>
      </div>
    {/each}
    <div slot="dots">
      <div class="select-container">
        <select
          value={currentPage}
          on:change="{(event) => onPageChange(event, showPage)}"
          on:blur="{(event) => onPageChange(event, showPage)}"
        >
          {#each  Array(pagesCount) as _, pageIndex (pageIndex)}
            <option value={pageIndex} class:active={currentPage === pageIndex}>
              {pageIndex}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </ImageCarousel>
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
  .active {
    background-color: grey;
    color: white;
  }

  .select-container {
    padding: 5px 0;
  }
  .select-container > select {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    height: 25px;
    width: 100px;
    border-radius: 5px;
  }
</style>