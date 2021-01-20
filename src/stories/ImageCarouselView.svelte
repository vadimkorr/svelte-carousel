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
      <h1>Element 1</h1>
    </CarouselChild>
    <CarouselChild>
      <h1>Element 2</h1>
    </CarouselChild>
  </ImageCarousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
</style>