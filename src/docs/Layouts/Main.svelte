<script context="module">
  import Table from './custom/Table.svelte';
  import Th from './custom/Th.svelte';
  import Tr from './custom/Tr.svelte';
  import Td from './custom/Td.svelte';
  export {
    Table as table,
    Th as th,
    Tr as tr,
    Td as td
  };
</script>

<script>
  const links = [{
    title: 'GitHub',
    url: 'https://github.com/vadimkorr/svelte-carousel'
  }, {
    title: 'NPM',
    url: 'https://www.npmjs.com/package/svelte-carousel'
  }, {
    title: 'REPL',
    url: 'https://svelte.dev/repl/f503a458832f4a358d9ec00f88945ff5'
  }]
</script>

<div class="docs__main-layout__main-container">
  <div class="docs__main-layout__header-container">
    <img class="docs__main-layout__logo" src="./svelte-carousel-logo-md.png" alt="svelte-carousel-logo" />
    <div class="docs__main-layout__links-container">
      {#each links as { url, title } (title)}
        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      {/each}
    </div>
  </div>
  <div class="docs__main-layout__content-container">
    <slot></slot>
  </div>
</div>

<style>
  .docs__main-layout__main-container {
    background-color: #eaeaea;
  }

  .docs__main-layout__header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f0e68c;
  }
  .docs__main-layout__logo {
    height: 80%;
    max-width: 100%;
    object-fit: contain;
  }
  .docs__main-layout__links-container {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .docs__main-layout__links-container > a {
    text-decoration: none;
    color: #009800;
    font-size: 18px;
  }
  .docs__main-layout__links-container > a:not(:last-child) {
    margin-right: 10px;
  }

  .docs__main-layout__content-container {
    margin: 0 auto;
  }
  @media screen and (min-width: 0px) {
    .docs__main-layout__content-container {
      width: 95%;
    }
  }
  @media screen and (min-width: 768px) {
    .docs__main-layout__content-container {
      width: 70%;
    }
  }
  @media screen and (min-width: 992px) {
    .docs__main-layout__content-container {
      width: 60%;
    }
  }
  @media screen and (min-width: 1200px) {
    .docs__main-layout__content-container {
      width: 50%;
    }
  }
</style>
