<script>
  import H from './H.svelte'
  import H1 from './dom/H1.svelte'
</script>

<H titleComponent={H1}>
  <slot />
</H>
