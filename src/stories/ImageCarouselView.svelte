<script>
  import ImageCarousel from '../ImageCarousel.svelte'
  import CarouselChild from '../CarouselChild.svelte'

  /**
   * Enable Next/Previos arrows
   */
	export let arrows = true;
</script>

<div class="main-container">
  <ImageCarousel {arrows}>
    <CarouselChild>
      <div class="child-content-container">
        <h1>Element 1</h1>
      </div>
    </CarouselChild>
    <CarouselChild>
      <div class="child-content-container">
        <h1>Element 2</h1>
      </div>
    </CarouselChild>
  </ImageCarousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .child-content-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>