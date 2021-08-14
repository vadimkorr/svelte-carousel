<script>
  import H from '../H.svelte'
  import H2 from './H2Dom.svelte'
</script>

<H titleComponent={H2}>
  <slot />
</H>

<style>
  :global(h2.title .anchor::before) {
    top: 8px;
  }
</style>
