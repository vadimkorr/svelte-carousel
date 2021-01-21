<script>
  import ImageCarousel from '../ImageCarousel.svelte'
  import CarouselChild from '../CarouselChild.svelte'

  /**
   * Enable Next/Previos arrows
   */
  export let arrows = true;
  
  /**
   * Infinite looping
   */
   export let infinite = true;
</script>

<div class="main-container">
  <ImageCarousel
    {arrows}
    {infinite}
  >
 
      <div
        class="child-content-container"
        style="background-color: green;"
      >
        <h1>Element 1</h1>
      </div>

      <div
        class="child-content-container"
        style="background-color: yellow;"
      >
        <h1>Element 2</h1>
      </div>

      <div
        class="child-content-container"
        style="background-color: blue;"
      >
        <h1>Element 3</h1>
      </div>

  </ImageCarousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .child-content-container {
    width: 500px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
</style>