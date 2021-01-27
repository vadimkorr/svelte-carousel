<script>
  import { NEXT, PREV } from '../../direction'

  /**
   * Indicates direction of the arrow ('next', 'prev')
   */
  export let direction = NEXT

  /**
   * Indicates if button disabled
   */
  export let disabled = false
</script>

<div
  class="carousel-arrow__circle"
  class:carousel-arrow__circle_disabled={disabled}
  on:click
>
  <i
    class="carousel-arrow__arrow"
    class:carousel-arrow__arrow-next={direction === NEXT}
    class:carousel-arrow__arrow-prev={direction === PREV}
  ></i>
</div>

<style>
  :root {
    --size: 2px
  }
  .carousel-arrow__circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(93, 93, 93, 0.5); /* #5d5d5d */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 100ms ease;
    cursor: pointer;
  }
  .carousel-arrow__circle:hover {
    opacity: 0.9;
  }
  .carousel-arrow__arrow {
    border: solid #1e1e1e;
    border-width: 0 var(--size) var(--size) 0;
    padding: var(--size);
    position: relative;
  }
  .carousel-arrow__arrow-next {
    transform: rotate(-45deg);
    left: calc(var(--size) / -2);
  }
  .carousel-arrow__arrow-prev {
    transform: rotate(135deg);
    right: calc(var(--size) / -2);
  }
  .carousel-arrow__circle_disabled,
  .carousel-arrow__circle_disabled:hover {
    opacity: 0.5;
  }
</style>