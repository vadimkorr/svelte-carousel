<script>
  import { onDestroy, onMount, tick, createEventDispatcher } from 'svelte'
  import { createStore } from '../../store'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'
  import Progress from '../Progress/Progress.svelte'
  import { NEXT, PREV } from '../../direction'
  import { swipeable } from '../../actions/swipeable'
  import { focusable } from '../../actions/focusable'
  import {
    addResizeEventListener,
    removeResizeEventListener
  } from '../../utils/event'
  import { getAdjacentIndexes } from '../../utils/page'
  import { get } from '../../utils/object'
  import { ProgressManager } from '../../utils/ProgressManager.js'

  const dispatch = createEventDispatcher()

  const autoplayDirectionFnDescription = {
    [NEXT]: () => {
      progressManager.start(() => {
        showNextPage()
      })
    },
    [PREV]: () => {
      progressManager.start(() => {
        showPrevPage()
      })
    }
  }

  const directionFnDescription = {
    [NEXT]: () => {
      showNextPage()
    },
    [PREV]: () => {
      showPrevPage()
    }
  }

  /**
   * CSS animation timing function
   * examples: 'linear', 'steps(5, end)', 'cubic-bezier(0.1, -0.6, 0.2, 0)'
   */
  export let timingFunction = 'ease-in-out';

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
   * Autoplay change interval (ms)
   */
  export let autoplayDuration = 3000

  /**
   * Autoplay change direction ('next', 'prev')
   */
  export let autoplayDirection = NEXT

  /**
   * Pause autoplay on focus
   */
  export let pauseOnFocus = true

  /**
   * Show autoplay duration progress indicator
   */
  export let autoplayProgressVisible = false

  /**
   * Current page indicator dots
   */
  export let dots = true

  export function goTo(pageIndex, options) {
    const animated = get(options, 'animated', true)
    if (typeof pageIndex !== 'number') {
      throw new Error('pageIndex should be a number')
    }
    showPage(pageIndex + Number(infinite), { offsetDelayMs: 0, animated })
  }

  export function goToPrev(options) {
    const animated = get(options, 'animated', true)
    showPrevPage({
      animated
    })
  }

  export function goToNext(options) {
    const animated = get(options, 'animated', true)
    showNextPage({
      animated
    })
  }

  let store = createStore()
  let currentPageIndex = 0
  $: originalCurrentPageIndex = currentPageIndex - Number(infinite);
  $: dispatch('pageChange', originalCurrentPageIndex)

  let pagesCount = 0
  $: originalPagesCount = Math.max(pagesCount - (infinite ? 2 : 0), 1) // without clones
  let pageWidth = 0
  let offset = 0
  let pageWindowElement
  let pagesElement
  let focused = false

  let progressValue
  const progressManager = new ProgressManager({
    autoplayDuration,
    onProgressValueChange: (value) => {
      progressValue = 1 - value
    }
  })

  $: {
    if (pauseOnFocus) {
      if (focused) {
        progressManager.pause()
      } else {
        progressManager.resume()
      }
    }
  }

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

    offsetPage(false)
  }
  
  function addClones() {
    const first = pagesElement.children[0]
    const last = pagesElement.children[pagesElement.children.length - 1]
    pagesElement.prepend(last.cloneNode(true))
    pagesElement.append(first.cloneNode(true))
  }

  function applyAutoplay() {
    // prevent progress change if not infinite for first and last page
    if (
      !infinite && (
        (autoplayDirection === NEXT && currentPageIndex === pagesCount - 1) || 
        (autoplayDirection === PREV && currentPageIndex === 0)
      )
    ) {
      progressManager.reset()
      return
    }
    if (autoplay) {
      autoplayDirectionFnDescription[autoplayDirection]()
    }
  }

  let cleanupFns = []

  onMount(() => {
    (async () => {
      await tick()
      cleanupFns.push(store.subscribe(value => {
        currentPageIndex = value.currentPageIndex
      }))
      cleanupFns.push(() => progressManager.reset())
      if (pagesElement && pageWindowElement) {
        // load first and last child to clone them 
        loaded = [0, pagesElement.children.length - 1]
        await tick()
        infinite && addClones()

        store.init(initialPageIndex + Number(infinite))
        applyPageSizes()
      }

      applyAutoplay()

      addResizeEventListener(applyPageSizes)
    })()
  })

  onDestroy(() => {
    removeResizeEventListener(applyPageSizes)
    cleanupFns.filter(fn => fn && typeof fn === 'function').forEach(fn => fn())
  })

  function handlePageChange(pageIndex) {
    showPage(pageIndex + Number(infinite), { offsetDelayMs: 0, animated: true })
  }

  function offsetPage(animated) {
    _duration = animated ? duration : 0
    offset = -currentPageIndex * pageWidth
    if (infinite) {
      if (currentPageIndex === 0) {
        showPage(pagesCount - 2, { offsetDelayMs: _duration, animated: false })
      } else if (currentPageIndex === pagesCount - 1) {
        showPage(1, { offsetDelayMs: _duration, animated: false })
      }
    }
  }

  // Disable page change while animation is in progress
  let disabled = false
  function safeChangePage(cb, options) {
    const animated = get(options, 'animated', true)
    if (disabled) return
    cb()
    disabled = true
    setTimeout(() => {
      disabled = false
      applyAutoplay()
    }, animated ? duration : 0)
  }

  function showPage(pageIndex, options) {
    const animated = get(options, 'animated', true)
    const offsetDelayMs = get(options, 'offsetDelayMs', 0)
    safeChangePage(() => {
      store.moveToPage({ pageIndex, pagesCount })
      setTimeout(() => {
        offsetPage(animated)
      }, offsetDelayMs)
    }, { animated })
  }
  function showPrevPage(options) {
    const animated = get(options, 'animated', true)
    safeChangePage(() => {
      store.prev({ infinite, pagesCount })
      offsetPage(animated)
    }, { animated })
  }
  function showNextPage(options) {
    const animated = get(options, 'animated', true)
    safeChangePage(() => {
      store.next({ infinite, pagesCount })
      offsetPage(animated)
    }, { animated })
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
    showPage(currentPageIndex, { offsetDelayMs: 0, animated: true })
  }
  function handleFocused(event) {
    focused = event.detail.value
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
      use:focusable
      on:focused={handleFocused}
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
          transition-timing-function: {timingFunction};
        "
        bind:this={pagesElement}
      >
        <slot {loaded}></slot>
      </div>
      {#if autoplayProgressVisible}
        <div class="sc-carousel-progress__container">
          <Progress value={progressValue} />
        </div>
      {/if}
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
  :root {
    --sc-arrow-size: 2px;

    --sc-color-rgb-light-50p: rgba(93, 93, 93, 0.5);

    --sc-color-hex-dark-50p: rgba(30, 30, 30, 0.5);
    --sc-color-hex-dark: #1e1e1e;
  }
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
    position: relative;
  }
  .sc-carousel__pages-container {
    width: 100%;
    display: flex; /* to put child elements in one row */
    transition-property: transform;
  }
  .sc-carousel__arrow-container {
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sc-carousel-progress__container {
    width: 100%;
    height: 5px;
    background-color: var(--sc-color-rgb-light-50p);
    position: absolute;
    bottom: 0;
  }
</style>
