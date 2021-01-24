<script>
  import { onDestroy, onMount, tick } from 'svelte'
  import { store } from '../../store'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'
  import { NEXT, PREV } from '../../direction'
  import { swipeable } from '../../utils/swipeable'
  import {
    addResizeEventListener,
    removeResizeEventListener
  } from '../../utils/event'

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
  export let initialPageIndex = 1

  /**
   * Transition speed (ms)
   */
  export let speed = 500
  let _speed = speed

  /**
   * Enables auto play of pages
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
  $: originalCurrentPageIndex = currentPageIndex - Number(infinite);
  let pagesCount = 0
  $: originalPagesCount = Math.max(pagesCount - (infinite ? 2 : 0), 0) // without clones
  let pageWidth = 0
  let offset = 0
  let pageWindowElement
  let pagesElement

  const unsubscribe = store.subscribe(value => {
    currentPageIndex = value.currentPageIndex
  })

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
      }, autoplaySpeed)
    }
    return {
      teardownAutoplay: () => {
        interval && clearInterval(interval)
      }
    }
  }
  
  function addClones() {
    const first = pagesElement.firstChild
    const last = pagesElement.children[pagesElement.children.length - 1]
    pagesElement.prepend(last.cloneNode(true))
    pagesElement.append(first.cloneNode(true))
  }

  onMount(async () => {
    await tick()
    if (pagesElement && pageWindowElement) {
      infinite && addClones()
      applyPageSizes()
    }

    const { teardownAutoplay } = applyAutoplay()

    addResizeEventListener(applyPageSizes)
    return () => {
      removeResizeEventListener(applyPageSizes)
      teardownAutoplay()
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  function handlePageChange(event) {
    showPage(event.detail + Number(infinite), { offsetDelay: 0, animated: true })
  }

  function offsetPage(animated) {
    _speed = animated ? speed : 0
    offset = -currentPageIndex * pageWidth
    if (infinite) {
      if (currentPageIndex === 0) {
        showPage(pagesCount - 2, { offsetDelay: speed, animated: false })
      } else if (currentPageIndex === pagesCount - 1) {
        showPage(1, { offsetDelay: speed, animated: false })
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
    _speed = 0
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

<div class="main-container">
  <div class="carousel-container">
    {#if arrows}
      <slot name="prev" {showPrevPage}>
        <div class="arrow-container">
          <Arrow
            direction="prev"
            disabled={!infinite && originalCurrentPageIndex === 0}
            on:click={showPrevPage}
          />
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
      showPage={pageIndex => showPage(pageIndex, { offsetDelay: 0, animated: true })}
    >
      <Dots
        pagesCount={originalPagesCount}
        currentPageIndex={originalCurrentPageIndex}
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
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>