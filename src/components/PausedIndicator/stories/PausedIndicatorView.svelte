<script>
  import PausedIndicator from '../PausedIndicator.svelte'

  let visible = false

  function toggleVisibility() {
    visible = !visible
  }
</script>

<PausedIndicator
  {visible}
/>

<div class="sb-container">
  <span class="sb-title">Toggle visibility</span>
  <button class="sb-button" on:click={toggleVisibility}>Toggle visibility</button>
</div>
