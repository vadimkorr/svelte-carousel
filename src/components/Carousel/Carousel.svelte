<script>
  import { onMount, tick } from 'svelte'
  import { createStore } from '../../store'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'
  import { NEXT, PREV } from '../../direction'
  import { swipeable } from '../../utils/swipeable'
  import {
    addResizeEventListener,
    removeResizeEventListener
  } from '../../utils/event'
  import { getAdjacentIndexes } from '../../utils/page'

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
   * Page to start on
   */
  export let initialPageIndex = 0

  /**
   * Transition duration (ms)
   */
  export let duration = 500
  let _duration = duration

  /**
   * Enables auto play of pages
   */
  export let autoplay = false

  /**
   * Auto play change interval
   */
  export let autoplayDuration = 3000

  /**
   * Auto play change direction ('next', 'prev')
   */
  export let autoplayDirection = NEXT

  /**
   * Current page indicator dots
   */
  export let dots = true

  let store = createStore()
  let currentPageIndex = 0
  $: originalCurrentPageIndex = currentPageIndex - Number(infinite);
  let pagesCount = 0
  $: originalPagesCount = Math.max(pagesCount - (infinite ? 2 : 0), 1) // without clones
  let pageWidth = 0
  let offset = 0
  let pageWindowElement
  let pagesElement

  // used for lazy loading images, preloaded only current, adjacent and cloanable images
  $: loaded = getAdjacentIndexes(originalCurrentPageIndex, originalPagesCount, infinite)

  function applyPageSizes() {
    const children = pagesElement.children
    pageWidth = pageWindowElement.clientWidth

    pagesCount = children.length

    for (let pageIndex=0; pageIndex<pagesCount; pageIndex++) {
      children[pageIndex].style.minWidth = `${pageWidth}px`
      children[pageIndex].style.maxWidth = `${pageWidth}px`
    }

    store.init(initialPageIndex + Number(infinite))
    offsetPage(false)
  }

  function applyAutoplay() {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        directionFnDescription[autoplayDirection]()
      }, autoplayDuration)
    }
    return {
      teardownAutoplay: () => {
        interval && clearInterval(interval)
      }
    }
  }
  
  function addClones() {
    const first = pagesElement.children[0]
    const last = pagesElement.children[pagesElement.children.length - 1]
    pagesElement.prepend(last.cloneNode(true))
    pagesElement.append(first.cloneNode(true))
  }

  onMount(async () => {
    await tick()
    const unsubscribe = store.subscribe(value => {
      currentPageIndex = value.currentPageIndex
    })
    if (pagesElement && pageWindowElement) {
      // load first and last child to clone them 
      loaded = [0, pagesElement.children.length - 1]
      await tick()
      infinite && addClones()
      applyPageSizes()
    }

    const { teardownAutoplay } = applyAutoplay()

    addResizeEventListener(applyPageSizes)
    return () => {
      removeResizeEventListener(applyPageSizes)
      teardownAutoplay()
      unsubscribe()
    }
  })

  function handlePageChange(pageIndex) {
    showPage(pageIndex + Number(infinite), { offsetDelay: 0, animated: true })
  }

  function offsetPage(animated) {
    _duration = animated ? duration : 0
    offset = -currentPageIndex * pageWidth
    if (infinite) {
      if (currentPageIndex === 0) {
        showPage(pagesCount - 2, { offsetDelay: duration, animated: false })
      } else if (currentPageIndex === pagesCount - 1) {
        showPage(1, { offsetDelay: duration, animated: false })
      }
    }
  }

  function showPage(pageIndex, { offsetDelay, animated }) {
    store.moveToPage({ pageIndex, pagesCount })
    setTimeout(() => {
      offsetPage(animated)
    }, offsetDelay)
  }
  function showPrevPage() {
    store.prev({ infinite, pagesCount })
    offsetPage(true)
  }
  function showNextPage() {
    store.next({ infinite, pagesCount })
    offsetPage(true)
  }

  // gestures
  function handleSwipeStart() {
    _duration = 0
  }
  function handleThreshold(event) {
    directionFnDescription[event.detail.direction]()
  }
  function handleSwipeMove(event) {
    offset += event.detail.dx
  }
  function handleSwipeEnd() {
    showPage(currentPageIndex, { offsetDelay: 0, animated: true })
  }
</script>

<div class="sc-carousel__carousel-container">
  <div class="sc-carousel__content-container">
    {#if arrows}
      <slot name="prev" {showPrevPage}>
        <div class="sc-carousel__arrow-container">
          <Arrow
            direction="prev"
            disabled={!infinite && originalCurrentPageIndex === 0}
            on:click={showPrevPage}
          />
        </div>
      </slot>
    {/if}
    <div
      class="sc-carousel__pages-window"
      bind:this={pageWindowElement}
    >
      <div
        class="sc-carousel__pages-container"
        use:swipeable="{{ thresholdProvider: () => pageWidth/3 }}"
        on:start={handleSwipeStart}
        on:move={handleSwipeMove}
        on:end={handleSwipeEnd}
        on:threshold={handleThreshold}
        style="
          transform: translateX({offset}px);
          transition-duration: {_duration}ms;
        "
        bind:this={pagesElement}
      >
        <slot {loaded}></slot>
      </div>    
    </div>
    {#if arrows}
      <slot name="next" {showNextPage}>
        <div class="sc-carousel__arrow-container">
          <Arrow
            direction="next"
            disabled={!infinite && originalCurrentPageIndex === originalPagesCount - 1}
            on:click={showNextPage}
          />
        </div>
      </slot>
    {/if}
  </div>
  {#if dots}
    <slot
      name="dots"
      currentPageIndex={originalCurrentPageIndex}
      pagesCount={originalPagesCount}
      showPage={handlePageChange}
    >
      <Dots
        pagesCount={originalPagesCount}
        currentPageIndex={originalCurrentPageIndex}
        on:pageChange={event => handlePageChange(event.detail)}
      ></Dots>
    </slot>
  {/if}
</div>

<style>
  .sc-carousel__carousel-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .sc-carousel__content-container {
    position: relative;
    display: flex;
    width: 100%;
  }
  .sc-carousel__pages-window {
    flex: 1;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
  }
  .sc-carousel__pages-container {
    width: 100%;
    display: flex; /* to put child elements in one row */
    transition-timing-function: ease-in-out;
    transition-property: transform;
  }
  .sc-carousel__arrow-container {
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>