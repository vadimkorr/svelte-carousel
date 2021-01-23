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
  import { NEXT, PREV } from '../direction'
  import { swipeable } from '../swipeable'
  import {
    addResizeEventListener,
    removeResizeEventListener
  } from '../utils/event'

  const directionFnDescription = {
    [NEXT]: showNextPage,
    [PREV]: showPrevPage
  }

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
  let _speed = speed

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
  export let autoplayDirection = NEXT

  /**
   * Current page indicator dots
   */
  export let dots = true

  let currentPageIndex = 0 
  let pagesCount = 0
  let pageWidth = 0
  let offset = 0
  let pageWindowElement
  let pagesElement

  const unsubscribe = store.subscribe(value => {
    currentPageIndex = value.currentPageIndex
  })

  function applySlideSizes() {
    const children = pagesElement ? pagesElement.children : []
    pageWidth = pageWindowElement.clientWidth

    const slidesCount = children.length
    pagesCount = getPagesCount({ slidesCount, slidesToShow })
    const slidesToShowTail = getSlidesToShowTail({ pagesCount, slidesToShow, slidesCount })

    for (let slideIndex=0; slideIndex<slidesCount; slideIndex++) {
      const pageIndex = getPageIndex({ slideIndex, slidesToShow })
      const isNotCompletePage = getIsNotCompletePage({ pageIndex, pagesCount })
      const slideSizePx = getSlideSize({ isNotCompletePage, pageWidth, slidesToShow, slidesToShowTail })
      children[slideIndex].style.minWidth = `${slideSizePx}px`
      children[slideIndex].style.maxWidth = `${slideSizePx}px`
    }
  }

  function applyAutoplay() {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        directionFnDescription[autoplayDirection]()
      }, autoplaySpeed)
    }
    return {
      teardownAutoplay: () => {
        interval && clearInterval(interval)
      }
    }
  }
  
  onMount(() => {
    applySlideSizes()
    store.init(initialPageIndex)
    applyOffset()

    const { teardownAutoplay } = applyAutoplay()

    addResizeEventListener(applySlideSizes)
    return () => {
      removeResizeEventListener(applySlideSizes)
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

  function handleSwipeStart() {
    _speed = 0
  }
  function handleThreshold(event) {
    _speed = speed
    directionFnDescription[event.detail.direction]()
  }
  function handleSwipeMove(event) {
    offset += event.detail.dx
  }
  function handleSwipeEnd() {
    _speed = speed
    showPage(currentPageIndex)
  }
</script>

<div class="main-container">
  <div class="carousel-container">
    {#if arrows}
      <slot name="prev" {showPrevPage}>
        <div class="arrow-container">
          <Arrow direction="prev" on:click={showPrevPage} />
        </div>
      </slot>
    {/if}
    <div
      class="content-container"
      bind:this={pageWindowElement}
    >
      <div
        use:swipeable="{{ thresholdProvider: () => pageWidth/3 }}"
        on:start={handleSwipeStart}
        on:move={handleSwipeMove}
        on:end={handleSwipeEnd}
        on:threshold={handleThreshold}
        style="
          transform: translateX({offset}px);
          transition-duration: {_speed}ms;
        "
        bind:this={pagesElement}
      >
        <slot></slot>
      </div>    
    </div>
    {#if arrows}
      <slot name="next" {showNextPage}>
        <div class="arrow-container">
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
  .arrow-container {
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>