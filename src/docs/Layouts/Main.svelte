<script context="module">
  import Carousel from '../../components/Carousel/Carousel.svelte'
  import Table from './custom/Table.svelte'
  import Th from './custom/Th.svelte'
  import Tr from './custom/Tr.svelte'
  import Td from './custom/Td.svelte'
  import { H1, H2 } from './custom/H'
  export {
    Table as table,
    Th as th,
    Tr as tr,
    Td as td,
    H1 as h1,
    H2 as h2,
  }
  import pkg from '../../../package.json'
</script>

<script>
  import links from '../data/links.json'
  import githubLogo from '../icons/github-logo.svg'
  import npmLogo from '../icons/npm-logo.svg'
  import youtubeLogo from '../icons/youtube-logo.svg'

  const icons = {
    'github-logo': githubLogo,
    'npm-logo': npmLogo,
    'youtube-logo': youtubeLogo,
  }
</script>

<div class="docs__main-layout__main-container">
  <div class="docs__main-layout__header-container">
    <div class="docs__main-layout__logo-container">
      <Carousel
        initialPageIndex={1}
      >
        {#each Array.from(Array(3).keys()) as index (index)}
          <img class="docs__main-layout__logo" src="./svelte-carousel-logo-md-full-width.png" alt="svelte-carousel-logo" />
        {/each}
      </Carousel>
      <span class="docs__main-layout__version">v{pkg.version}</span>
    </div>
    <div class="docs__main-layout__links-container">
      {#each links as { url, title, iconName } (title)}
        <a href={url} target="_blank" rel="noopener noreferrer" class="docs__main-layout__link">
          {#if iconName}
            <img class="docs__main-layout__link-icon" src={icons[iconName]} alt={iconName}>
          {:else}
            <span class="docs__main-layout__link-text">{title}</span>
          {/if}
        </a>
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

  .docs__main-layout__logo-container {
    position: relative;
    max-width: min(90%, 500px);
  }
  .docs__main-layout__version {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fff;
    padding: 3px 7px;
    border-radius: 5px;
    line-height: 14px;
    font-size: 14px;
  }
  .docs__main-layout__logo {
    max-height: 100%;
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
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 3px;
  }
  .docs__main-layout__links-container > a:not(:last-child) {
    margin-right: 10px;
  }
  .docs__main-layout__links-container > a:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .docs__main-layout__links-container > a:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .docs__main-layout__link-icon {
    width: 25px;
  }
  .docs__main-layout__link-text {
    color: #009800;
    font-size: 18px;
    font-weight: 500;
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
