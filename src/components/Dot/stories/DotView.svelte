<script>
  import Dot from '../Dot.svelte'

  /**
   * Indicates if dot is active
   */
  export let active = false

  function handleDotClick() {
    active = !active
  }
</script>

<Dot
  {active}
  on:click={handleDotClick}
/>
