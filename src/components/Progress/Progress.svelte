<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const MAX_PERCENT = 100;

  /**
   * Progress value
   */
  export let value = 0

  $: width = Math.max(value * MAX_PERCENT, 0)
</script>

<div
  class="sc-carousel-progress__indicator"
  style="
    width: {width}%;
  "
></div>

<style>
  :root {
    --sc-color-hex-dark-50p: rgba(30, 30, 30, 0.5)
  }
  .sc-carousel-progress__indicator {
    height: 100%;
    background-color: var(--sc-color-hex-dark-50p);
  }
</style>
