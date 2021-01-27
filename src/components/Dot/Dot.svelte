<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const DOT_SIZE_PX = 5
  const ACTIVE_DOT_SIZE_PX = 8

  const size = tweened(DOT_SIZE_PX, {
    duration: 250,
    easing: cubicInOut
  });

  /**
   * Indicates if dot is active
   */
  export let active = false

  $: {
    size.set(active ? ACTIVE_DOT_SIZE_PX : DOT_SIZE_PX)
  }
</script>

<div class="sc-carousel-dot__container">
  <div
    class="sc-carousel-dot__dot"
    class:sc-carousel-dot__dot_active={active}
    style="
      height: {$size}px;
      width: {$size}px;
    "
    on:click
  ></div>
</div>

<style>
  .sc-carousel-dot__container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;
  }
  .sc-carousel-dot__dot {
    background-color: #5d5d5d;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 100ms ease;
  }
  .sc-carousel-dot__dot:hover {
    opacity: 0.9;
  }
  .sc-carousel-dot__dot_active {
    opacity: 0.7;
  }
</style>