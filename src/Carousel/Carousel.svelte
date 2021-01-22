<script>
  // TODO: rename image carousel to just carousel
  import { onDestroy, onMount } from 'svelte'
  import { store } from '../store'
  import {
    getPageIndex,
    getPagesCount,
    getSlidesToShowTail,
    getSlideSize,
    getIsNotCompletePage
  } from '../utils/size'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'

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
  export let initialPageIndex = 1

  /**
   * Transition speed (ms)
   */
  export let speed = 500

  /**
   * Enables auto play of slides
   */
  export let autoplay = false

  /**
   * Auto play change interval
   */
  export let autoplaySpeed = 3000

  /**
   * Auto play change direction ('next', 'prev')
   */
  export let autoplayDirection = 'next'

  /**
   * Current page indicator dots
   */
  export let dots = true

  let currentPageIndex = 0 
  let pagesCount = 0
  let pageWidth = 0
  let offset
  let contentContainerElement
  let innerContentContainerElement

  const unsubscribe = store.subscribe(value => {
    currentPageIndex = value.currentPageIndex
  })

  function applySlideSizes() {
    const children = innerContentContainerElement ? innerContentContainerElement.children : []
    pageWidth = contentContainerElement.clientWidth

    const slidesCount = children.length
    pagesCount = getPagesCount({ slidesCount, slidesToShow })
    const slidesToShowTail = getSlidesToShowTail({ pagesCount, slidesToShow, slidesCount })

    for (let slideIndex=0; slideIndex<children.length; slideIndex++) {
      const pageIndex = getPageIndex({ slideIndex, slidesToShow })
      const isNotCompletePage = getIsNotCompletePage({ pageIndex, pagesCount })
      const slideSizePx = getSlideSize({ isNotCompletePage, pageWidth, slidesToShow, slidesToShowTail })
      children[slideIndex].style.minWidth = `${slideSizePx}px`
      children[slideIndex].style.maxWidth = `${slideSizePx}px`
    }
  }

  function applyAutoplay() {
    const autoplayDirectionFnDescription = {
      'next': showNextPage,
      'prev': showPrevPage
    }
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        autoplayDirectionFnDescription[autoplayDirection]()
      }, autoplaySpeed)
    }
    return {
      teardownAutoplay: () => {
        interval && clearInterval(interval)
      }
    }
  }
  
  onMount(() => {
    store.init(initialPageIndex)
    applySlideSizes()

    const { teardownAutoplay } = applyAutoplay()

    window.addEventListener('resize', applySlideSizes)
    return () => {
      window.removeEventListener('resize', applySlideSizes)
      teardownAutoplay()
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  function handlePageChange(event) {
    showPage(event.detail)
  }

  function applyOffset() {
    offset = -currentPageIndex * pageWidth
  }

  function showPage(pageIndex) {
    store.moveToPage({ pageIndex, pagesCount })
    applyOffset()
  }
  function showPrevPage() {
    store.prev({ infinite, pagesCount })
    applyOffset()
  }
  function showNextPage() {
    store.next({ infinite, pagesCount })
    applyOffset()
  }
</script>

<div class="main-container">
  <div class="carousel-container">
    {#if arrows}
      <slot name="prev" {showPrevPage}>
        <div class="side-container">
          <Arrow direction="prev" on:click={showPrevPage} />
        </div>
      </slot>
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
      <slot name="next" {showNextPage}>
        <div class="side-container">
          <Arrow direction="next" on:click={showNextPage} />
        </div>
      </slot>
    {/if}
  </div>
  {#if dots}
    <slot
      name="dots"
      currentPageIndex={currentPageIndex}
      {pagesCount}
      {showPage}
    >
      <Dots
        {pagesCount}
        currentPageIndex={currentPageIndex}
        on:pageChange={handlePageChange}
      ></Dots>
    </slot>
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .carousel-container {
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
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>