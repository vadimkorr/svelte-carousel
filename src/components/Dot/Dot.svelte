<script>
  /**
   * Indicates if dot is active
   */
  export let active = false
</script>

<button
  class="sc-carousel-button sc-carousel-dot__dot"
  class:sc-carousel-dot__dot_active={active}
  on:click
></button>

<style>
  :root {
    --sc-dot-size: 6px;
    --sc-active-dot-size: 8px;
    --sc-dot-size-animation-time: 250ms;
  }

  .sc-carousel-dot__dot {
    background-color: var(--sc-color-rgb-light);
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
    transition:
      opacity 100ms ease,
      height var(--sc-dot-size-animation-time) ease,
      width var(--sc-dot-size-animation-time) ease;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    height: var(--sc-dot-size);
    width: var(--sc-dot-size);
  }
  .sc-carousel-dot__dot:hover {
    opacity: 0.9;
  }
  .sc-carousel-dot__dot_active {
    opacity: 0.7;

    height: var(--sc-active-dot-size);
    width: var(--sc-active-dot-size);
  }
</style>
