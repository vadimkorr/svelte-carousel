<script>
  // TODO: rename image carousel to just carousel
  // TODO: seems CarouselChild component can be removed
  import { onMount } from 'svelte'
  import { store } from './store'
  import {
    getPageIndex,
    getPagesCount,
    getSlidesToShowTail,
    getSlideSize,
    getIsNotCompletePage
  } from './utils/size'

  /**
   * Enable Next/Prev arrows
   */
  export let arrows = true

  /**
   * Infinite looping
   */
  export let infinite = true

  /**
   * Number of slides to show at a time
   */
  export let slidesToShow = 1

  /**
   * Page to start on
   */
  export let initialPage = 1

  /**
   * Transition speed (ms)
   */
  export let speed = 500

  let pagesCount = 0
  let contentContainerWidth = 0
  let offset
  let contentContainerElement
  let innerContentContainerElement

  function applySlideSizes() {
    const children = innerContentContainerElement.children
    contentContainerWidth = contentContainerElement.clientWidth

    const slidesCount = children.length
    pagesCount = getPagesCount({ slidesCount, slidesToShow })
    const slidesToShowTail = getSlidesToShowTail({ pagesCount, slidesToShow, slidesCount })

    for (let slideIndex=0; slideIndex<children.length; slideIndex++) {
      const pageIndex = getPageIndex({ slideIndex, slidesToShow })
      const isNotCompletePage = getIsNotCompletePage({ pageIndex, pagesCount })
      const slideSizePx = getSlideSize({ isNotCompletePage, contentContainerWidth, slidesToShow, slidesToShowTail })
      children[slideIndex].style.minWidth = `${slideSizePx}px`
      children[slideIndex].style.maxWidth = `${slideSizePx}px`
    }
    moveToPage(initialPage)
  }
  
  onMount(() => {
    store.reset() // to init after hot reload
    applySlideSizes()

    window.addEventListener('resize', applySlideSizes)
    return () => {
      window.removeEventListener('resize', applySlideSizes)
    }
  })

  function moveToPage(pageIndex) {
    store.moveToPage({ pageIndex, pagesCount })
    applyOffset()
  }

  function applyOffset() {
    offset = -$store.currentItemIndex * contentContainerWidth
  }

  function handlePrevClick() {
    store.prev({ infinite, pagesCount })
    applyOffset()
  }
  function handleNextClick() {
    store.next({ infinite, pagesCount })
    applyOffset()
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
      style="
        transform: translateX({offset}px);
        transition-duration: {speed}ms;
      "
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
    transition-timing-function: ease-in-out;
    transition-property: transform;
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