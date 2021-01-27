<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const sizePx = 5
  const sizeCurrentPx = 8

  const size = tweened(sizePx, {
    duration: 250,
    easing: cubicInOut
  });

  /**
   * Indicates if dot is active
   */
  export let active = false

  $: {
    size.set(active ? sizeCurrentPx : sizePx)
  }
</script>

<div class="carousel-dot__container">
  <div
    class="carousel-dot__dot"
    class:carousel-dot__dot_current={active}
    style="
      height: {$size}px;
      width: {$size}px;
    "
    on:click
  ></div>
</div>

<style>
  .carousel-dot__container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;
  }
  .carousel-dot__dot {
    background-color: #5d5d5d;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 100ms ease;
  }
  .carousel-dot__dot:hover {
    opacity: 0.9;
  }
  .carousel-dot__dot_current {
    opacity: 0.7;
  }
</style>