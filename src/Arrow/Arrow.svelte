<script>
  import { NEXT, PREV } from '../direction'
  /**
   * Indicates direction of the arrow ('next', 'prev')
   */
  export let direction = NEXT
</script>

<div
  class="circle"
  on:click
>
  <i
    class="arrow"
    class:next={direction === NEXT}
    class:prev={direction === PREV}
  ></i>
</div>

<style>
  :root {
    --size: 2px
  }
  .circle {
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
  .circle:hover {
    opacity: 0.9;
  }
  .arrow {
    border: solid #1e1e1e;
    border-width: 0 var(--size) var(--size) 0;
    padding: var(--size);
    position: relative;
  }
  .next {
    transform: rotate(-45deg);
    left: calc(var(--size) / -2);
  }
  .prev {
    transform: rotate(135deg);
    right: calc(var(--size) / -2);
  }
</style>