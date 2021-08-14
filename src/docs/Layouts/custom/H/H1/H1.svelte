<script>
  import H from '../H.svelte'
  import H1 from './H1Dom.svelte'
</script>

<H titleComponent={H1}>
  <slot />
</H>

<style>
  :global(h1.docs__title) {
    margin: 16px 0;
  }
  :global(h1.docs__title .docs__anchor::before) {
    top: 15px;
  }
</style>
