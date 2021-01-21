<script>
  import ImageCarousel from '../ImageCarousel.svelte'

  /**
   * Enable Next/Previos arrows
   */
  export let arrows = true;
  
  /**
   * Infinite looping
   */
  export let infinite = true;

  /**
   * Elements per page
   */
  export let perPage = 1;

  /**
   * Page to start on
   */
  export let initialPage = 1

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
    {perPage}
    {initialPage}
  >
    {#each colors as color (color)}
      <div
        class="color-container"
        style="background-color: {color};"
      >
        <p>{color}</p>
      </div>
    {/each}
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
</style>