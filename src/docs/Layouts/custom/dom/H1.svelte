<h1 {...$$props}>
  <slot />
</h1>

<style>
  :global(h1 .anchor::before) {
    top: 15px;
  }
</style>
