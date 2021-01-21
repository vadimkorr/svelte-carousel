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
    <div
      class="child-content-container"
      style="background-color: pink;"
    >
      <h1>Element 4</h1>
    </div>
    <!-- <div
      class="child-content-container"
      style="background-color: lightblue;"
    >
      <h1>Element 5</h1>
    </div> -->
  </ImageCarousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .child-content-container {
    /* min-width: 100%; */
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>