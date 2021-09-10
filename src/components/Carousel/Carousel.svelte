<script>
  import { onDestroy, onMount, tick, createEventDispatcher } from 'svelte'
  import { createStore } from '../../store'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'
  import Progress from '../Progress/Progress.svelte'
  import { NEXT, PREV } from '../../direction'
  import { swipeable } from '../../actions/swipeable'
  import { hoverable } from '../../actions/hoverable'
  import { tappable } from '../../actions/tappable'
  import {
    addResizeEventListener,
    removeResizeEventListener
  } from '../../utils/event'
  import {
    getSizes,
    applyParticleSizes,
    getCurrentPageIndex,
    getPartialPageSize,
    getPagesCountByParticlesCount,
    getParticleIndexByPageIndex,
  } from '../../utils/page'
  import {
    getClones,
    applyClones,
    getClonesCount,
  } from '../../utils/clones'
  import {
    getAdjacentIndexes,
  } from '../../utils/lazy'
  import {
    getValueInRange,
  } from '../../utils/math'
  import { get } from '../../utils/object'
  import { ProgressManager } from '../../utils/ProgressManager'
  import { wait } from '../../utils/interval'

  const dispatch = createEventDispatcher()

  const autoplayDirectionFnDescription = {
    [NEXT]: async () => await progressManager.start(showNextPage),
    [PREV]: async () => await progressManager.start(showPrevPage)
  }

  const directionFnDescription = {
    [NEXT]: showNextPage,
    [PREV]: showPrevPage
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
   * Enables autoplay of pages
   */
  export let autoplay = false
  $: {
    applyAutoplayIfNeeded(autoplay)
  }

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
  export let pauseOnFocus = false

  /**
   * Show autoplay duration progress indicator
   */
  export let autoplayProgressVisible = false

  /**
   * Current page indicator dots
   */
  export let dots = true

  /**
   * Enable swiping
   */
  export let swiping = true

  /**
   * Number of particles to show 
   */
  export let particlesToShow = 1

  /**
   * Number of particles to scroll 
   */
  export let particlesToScroll = 1

  export async function goTo(pageIndex, options) {
    const animated = get(options, 'animated', true)
    if (typeof pageIndex !== 'number') {
      throw new Error('pageIndex should be a number')
    }
    await showPage(getParticleIndexByPageIndex({
      infinite,
      pageIndex,
      clonesCountHead: clonesCount.head,
      particlesToScroll,
      particlesCount,
      particlesToShow,
    }), { animated })
  }

  export async function goToPrev(options) {
    const animated = get(options, 'animated', true)
    await showPrevPage({ animated })
  }

  export async function goToNext(options) {
    const animated = get(options, 'animated', true)
    await showNextPage({ animated })
  }

  let store = createStore()

  $: clonesCount = getClonesCount({
    infinite,
    particlesToShow,
    partialPageSize,
  })

  let currentParticleIndex = 0
  $: currentPageIndex = getCurrentPageIndex({
    currentParticleIndex,
    particlesCount,
    headClonesCount: clonesCount.head,
    infinite,
    particlesToScroll,
  })
  $: dispatch('pageChange', currentPageIndex)

  let particlesCount = 0
  let particlesCountWithoutClones = 1
  $: pagesCount = getPagesCountByParticlesCount({
    infinite,
    particlesCountWithoutClones,
    particlesToScroll,
  })

  let partialPageSize = 0

  let pageWindowWidth = 0
  let particleWidth = 0
  let offset = 0
  let pageWindowElement
  let particlesContainer
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
  $: loaded = getAdjacentIndexes({
    infinite,
    pageIndex: currentPageIndex,
    pagesCount,
    particlesCount: particlesCountWithoutClones,
    particlesToShow,
    particlesToScroll,
  }).particleIndexes

  function initPageSizes() {
    const sizes = getSizes({
      pageWindowElement,
      particlesContainerChildren: particlesContainer.children,
      particlesToShow,
    })
    applyParticleSizes({
      particlesContainerChildren: particlesContainer.children,
      particleWidth: sizes.particleWidth,
    })

    pageWindowWidth = sizes.pageWindowWidth
    particleWidth = sizes.particleWidth
    particlesCount = sizes.particlesCount

    offsetPage({
      animated: false,
    })
  }
  
  function addClones() {
    const {
      clonesToAppend,
      clonesToPrepend,
    } = getClones({
      headClonesCount: clonesCount.head,
      tailClonesCount: clonesCount.tail,
      particlesContainerChildren: particlesContainer.children,
    })
    applyClones({
      particlesContainer,
      clonesToAppend,
      clonesToPrepend,
    })
  }

  async function applyAutoplayIfNeeded(autoplay) {
    // prevent progress change if not infinite for first and last page
    if (
      !infinite && (
        (autoplayDirection === NEXT && currentParticleIndex === particlesCount - 1) || 
        (autoplayDirection === PREV && currentParticleIndex === 0)
      )
    ) {
      progressManager.reset()
      return
    }

    if (autoplay) {
      await autoplayDirectionFnDescription[autoplayDirection]()
    }
  }

  let cleanupFns = []

  onMount(() => {
    (async () => {
      await tick()
      cleanupFns.push(store.subscribe(value => {
        currentParticleIndex = value.currentParticleIndex
      }))
      cleanupFns.push(() => progressManager.reset())
      if (particlesContainer && pageWindowElement) {
        particlesCountWithoutClones = particlesContainer.children.length

        particlesToShow = getValueInRange(1, particlesToShow, particlesCountWithoutClones)
        particlesToScroll = getValueInRange(1, particlesToScroll, particlesCountWithoutClones)
        initialPageIndex = getValueInRange(0, initialPageIndex, particlesCountWithoutClones - 1)

        partialPageSize = getPartialPageSize({
          particlesToScroll,
          particlesToShow,
          particlesCountWithoutClones,
        })

        await tick()
        infinite && addClones()

        store.init(getParticleIndexByPageIndex({
          infinite,
          pageIndex: initialPageIndex,
          clonesCountHead: clonesCount.head,
          particlesToScroll,
          particlesCount,
          particlesToShow,
        }))

        initPageSizes()
      }

      addResizeEventListener(initPageSizes)
    })()
  })

  onDestroy(() => {
    removeResizeEventListener(initPageSizes)
    cleanupFns.filter(fn => fn && typeof fn === 'function').forEach(fn => fn())
  })

  async function handlePageChange(pageIndex) {
    await showPage(getParticleIndexByPageIndex({
      infinite,
      pageIndex,
      clonesCountHead: clonesCount.head,
      particlesToScroll,
      particlesCount,
      particlesToShow,
    }))
  }

  function offsetPage(options) {
    const animated = get(options, 'animated', true)
    return new Promise((resolve) => {
      // _duration is an offset animation time
      _duration = animated ? duration : 0
      offset = -currentParticleIndex * particleWidth
      setTimeout(() => {
        resolve()
      }, _duration)
    })
  }

  // makes delayed jump to 1st or last element
  async function jumpIfNeeded() {
    let jumped = false
    if (infinite) {
      if (currentParticleIndex === 0) {
        await showPage(particlesCount - clonesCount.total, { animated: false })
        jumped = true
      } else if (currentParticleIndex === particlesCount - clonesCount.tail) {
        await showPage(clonesCount.head, { animated: false })
        jumped = true
      }
    }
    return jumped
  }

  // Disable page change while animation is in progress
  let disabled = false
  async function changePage(updateStoreFn, options) {
    progressManager.reset()
    if (disabled) return
    disabled = true

    updateStoreFn()
    await offsetPage({ animated: get(options, 'animated', true) })
    disabled = false

    const jumped = await jumpIfNeeded()
    !jumped && applyAutoplayIfNeeded(autoplay) // no need to wait it finishes
  }

  async function showPage(particleIndex, options) {
    await changePage(
      () => store.moveToParticle({
        particleIndex,
        particlesCount,
      }),
      options
    )
  }
  async function showPrevPage(options) {
    // TODO: return if disabled
    await changePage(
      () => store.prev({
        infinite,
        particlesCount,
        particlesToScroll,
      }),
      options,
    )
  }
  async function showNextPage(options) {
    // TODO: return if disabled
    await changePage(
      () => store.next({
        infinite,
        particlesCount,
        particlesToScroll,
        clonesCountTail: clonesCount.tail,
      }),
      options,
    )
  }

  // gestures
  function handleSwipeStart() {
    if (!swiping) return
    _duration = 0
  }
  async function handleSwipeThresholdReached(event) {
    if (!swiping) return
    await directionFnDescription[event.detail.direction]()
  }
  function handleSwipeMove(event) {
    if (!swiping) return
    offset += event.detail.dx
  }
  function handleSwipeEnd() {
    if (!swiping) return
    showPage(currentParticleIndex)
  }
  async function handleSwipeFailed() {
    if (!swiping) return
    await offsetPage({ animated: true })
  }

  function handleHovered(event) {
    focused = event.detail.value
  } 
  function handleTapped(event) {
    focused = !focused
  } 
</script>

<div class="sc-carousel__carousel-container">
  <div class="sc-carousel__content-container">
    {#if arrows}
      <slot name="prev" {showPrevPage}>
        <div class="sc-carousel__arrow-container">
          <Arrow
            direction="prev"
            disabled={!infinite && currentPageIndex === 0}
            on:click={showPrevPage}
          />
        </div>
      </slot>
    {/if}
    <div
      class="sc-carousel__pages-window"
      bind:this={pageWindowElement}

      use:hoverable
      on:hovered={handleHovered}

      use:tappable
      on:tapped={handleTapped}
    >
      <div
        class="sc-carousel__pages-container"
        use:swipeable="{{ thresholdProvider: () => pageWindowWidth/3 }}"
        on:swipeStart={handleSwipeStart}
        on:swipeMove={handleSwipeMove}
        on:swipeEnd={handleSwipeEnd}
        on:swipeFailed={handleSwipeFailed}
        on:swipeThresholdReached={handleSwipeThresholdReached}
        style="
          transform: translateX({offset}px);
          transition-duration: {_duration}ms;
          transition-timing-function: {timingFunction};
        "
        bind:this={particlesContainer}
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
            disabled={!infinite && currentPageIndex === pagesCount - 1}
            on:click={showNextPage}
          />
        </div>
      </slot>
    {/if}
  </div>
  {#if dots}
    <slot
      name="dots"
      currentPageIndex={currentPageIndex}
      pagesCount={pagesCount}
      showPage={handlePageChange}
    >
      <Dots
        pagesCount={pagesCount}
        currentPageIndex={currentPageIndex}
        on:pageChange={event => handlePageChange(event.detail)}
      ></Dots>
    </slot>
  {/if}
</div>

<style>
  :root {
    --sc-color-rgb-light-50p: rgba(93, 93, 93, 0.5);
    --sc-color-rgb-light: #5d5d5d;
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
