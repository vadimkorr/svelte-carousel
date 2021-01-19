<script>
  import ImageCarousel from '../ImageCarousel.svelte'

  /**
   * Enable Next/Previos arrows
   */
	export let arrows = true;
</script>

<div class="main-container">
  <ImageCarousel {arrows} >
    <h1>Element 1</h1>
    <h1>Element 2</h1>
  </ImageCarousel>
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
</style>