<script>
  export let src
  export let alt
  export let loaded = false
</script>

<div class="image-container">
  {#if loaded}
    <img {src} {alt} />
  {/if}
</div>

<style>
  .image-container {
    display: block;
    width: 100%;
    height: 150px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-drag: none;
  }
</style>
