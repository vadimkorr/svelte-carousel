<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const MAX_PERCENT = 100;

  /**
   * Progress value
   */
  export let value = 0.5

  $: width = Math.min(value * MAX_PERCENT, MAX_PERCENT)
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
    background-color: gray;
  }
</style>
