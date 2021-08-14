<script>
  /**
   * Indicates if indicator is visible
   */
  export let visible = false
</script>

<div
  class="sc-carousel-paused-indicator__icons-container"
  class:sc-carousel-paused-indicator__icons-container-visible={visible}
>
  <i class="sc-carousel-paused-indicator__icon"></i>
  <i class="sc-carousel-paused-indicator__icon"></i>
</div>

<style>
  .sc-carousel-paused-indicator__icons-container {
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 250ms ease;
  }
  .sc-carousel-paused-indicator__icons-container-visible {
    opacity: 0.5;
  }
  .sc-carousel-paused-indicator__icons-container:hover {
    opacity: 0.9;
  }

  .sc-carousel-paused-indicator__icon {
    height: 20px;
    width: 7px;
    border-radius: 2px;
    background-color: var(--sc-color-rgb-light);
  }
  .sc-carousel-paused-indicator__icon:not(:last-child) {
    margin-right: 5px;
  }
</style>