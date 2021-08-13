<script>
  import H from './H.svelte'
  import H2 from './dom/H2.svelte'
</script>

<H titleComponent={H2}>
  <slot />
</H>
