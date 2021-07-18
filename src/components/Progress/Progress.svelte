<script>
  const MAX_PERCENT = 100;

  /**
   * Progress value, [0, 1]
   */
  export let value = 0

  $: width = Math.min(Math.max(value * MAX_PERCENT, 0), MAX_PERCENT)
</script>

<div
  class="sc-carousel-progress__indicator"
  style="
    width: {width}%;
  "
></div>

<style>
  .sc-carousel-progress__indicator {
    height: 100%;
    background-color: var(--sc-color-hex-dark-50p);
  }
</style>
