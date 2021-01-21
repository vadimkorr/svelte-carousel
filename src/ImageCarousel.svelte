<script>
  // TODO: rename image carousel to just carousel
  // TODO: seems CarouselChild component can be removed
  import { onMount } from 'svelte'
  import { store } from './store'
  import {
    getPageIndex,
    getPagesCount,
    getPerPageTail,
    getSlideSize,
    getIsNotCompletePage
  } from './utils/size'


  /**
   * Enable Next/Prev arrows
   */
  export let arrows = true;

  /**
   * Infinite looping
   */
  export let infinite	= true;


  export let perPage = 2;


  let contentContainerWidth = 0
  let contentContainerElement
  let innerContentContainerElement

  function applySlideSizes() {
    const children = innerContentContainerElement.children
    contentContainerWidth = contentContainerElement.clientWidth

    // TODO: add event listener on resize
    const slidesCount = children.length
    const pagesCount = getPagesCount({ slidesCount, perPage })
    const perPageTail = getPerPageTail({ pagesCount, perPage, slidesCount })

    let pageIndex = 0; // TODO: init value from params
    for (let slideIndex=0; slideIndex<children.length; slideIndex++) {
      pageIndex = getPageIndex({ slideIndex, perPage })
      const isNotCompletePage = getIsNotCompletePage({ pageIndex, pagesCount })
      const slideSizePx = getSlideSize({ isNotCompletePage, contentContainerWidth, perPage, perPageTail })
      children[slideIndex].style.minWidth = `${slideSizePx}px`
      children[slideIndex].style.maxWidth = `${slideSizePx}px`
      store.setItem() // TODO: remove
    }
  }


  
  onMount(() => {
    store.reset() // to init after hot reload
    store.setCurrentItemIndex(0) // to init index after hot reload, check one more time
    applySlideSizes()

    window.addEventListener('resize', applySlideSizes)


    return () => {
      window.removeEventListener('resize', applySlideSizes)
    }


  })

  let offset
  function handlePrevClick() {
    store.prev({ infinite, perPage })
    offset = -$store.currentItemIndex * contentContainerWidth
  }
  function handleNextClick() {
    store.next({ infinite, perPage })
    offset = -$store.currentItemIndex * contentContainerWidth
  }
</script>

<div class="main-container">
  {#if arrows}
  <div class="side-container">
    <span
      class="clickable"
      on:click={handlePrevClick}
    >&lt;</span>
  </div>
  {/if}
  <div
    class="content-container"
    bind:this={contentContainerElement}
  >
    <div
      style="transform: translateX({offset}px);"
      bind:this={innerContentContainerElement}
    >
      <slot></slot>
    </div>
  </div>
  {#if arrows}
  <div class="side-container">
    <span
      class="clickable"
      on:click={handleNextClick}
    >&gt;</span>
  </div>
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
  }
  .content-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
  }
  .content-container > div {
    width: 100%;
    display: flex; /* to put child elements in one row */
    transition: transform 1s ease-in-out; /* pass transition duration as param */
  }
  .side-container {
    background-color: cornflowerblue;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .clickable {
    cursor: pointer;
  }
</style>