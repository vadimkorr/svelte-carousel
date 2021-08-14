<script>
  import { onMount } from 'svelte'
  import { parseTitleStr } from '../../../utils/string'

  export let titleComponent
  let titleEl
  let anchorId
  let title

  onMount(() => {
    const parsed = parseTitleStr(titleEl.textContent)
    title = parsed.title
    anchorId = parsed.props.anchorId
  })
</script>

<div>
  <svelte:component this={titleComponent} id={anchorId} class="docs__title">
    <a class="docs__anchor" href={`#${anchorId}`}>
      {title}
      {#if !title}
        <span bind:this={titleEl}><slot /></span>
      {/if}
    </a>
  </svelte:component>
</div>

<style>
  :global(.docs__title) {
    display: inline-block;
  }
  :global(.docs__title:hover .docs__anchor::before) {
    visibility: visible;
  }
  .docs__anchor {
    position: relative;
    margin-left: 10px;
    text-decoration: none;
    color: #000000;
  }
  .docs__anchor::before {
    visibility: hidden;
    font-size: 14px;
    content: "\1F517";
    position: absolute;
    left: -20px;
  }
</style>
