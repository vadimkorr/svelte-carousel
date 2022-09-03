<script>
  import { onDestroy, onMount, tick, createEventDispatcher } from 'svelte'
  import Dots from '../Dots/Dots.svelte'
  import Arrow from '../Arrow/Arrow.svelte'
  import Progress from '../Progress/Progress.svelte'
  import { NEXT, PREV } from '../../direction'
  import { swipeable } from '../../actions/swipeable'
  import { hoverable } from '../../actions/hoverable'
  import { tappable } from '../../actions/tappable'
  import {
    applyParticleSizes,
    createResizeObserver,
  } from '../../utils/page'
  import {
    getClones,
    applyClones,
  } from '../../utils/clones'
  import { get, switcher } from '../../utils/object'
  import createCarousel from './createCarousel'

  // used for lazy loading images, preloaded only current, adjacent and cloanable images
  let loaded = []
  let currentPageIndex
  $: {
    dispatch('pageChange', currentPageIndex)
  }

  let progressValue
  let offset = 0
  let durationMs = 0
  let pagesCount = 1

  const [{ data, progressManager }, methods, service] = createCarousel((key, value) => {
    switcher({
      'currentPageIndex': () => currentPageIndex = value,
      'progressValue': () => progressValue = value,
      'offset': () => offset = value,
      'durationMs': () => durationMs = value,
      'pagesCount': () => pagesCount = value,
      'loaded': () => loaded = value,
    })(key)
  })

  const dispatch = createEventDispatcher()

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
  $: {
    data.infinite = infinite
  }

  /**
   * Page to start on
   */
  export let initialPageIndex = 0

  /**
   * Transition duration (ms)
   */
  export let duration = 500
  $: {
    data.durationMsInit = duration
  }

  /**
   * Enables autoplay of pages
   */
  export let autoplay = false
  $: {
    data.autoplay = autoplay
  }

  /**
   * Autoplay change interval (ms)
   */
  export let autoplayDuration = 3000
  $: {
    data.autoplayDuration = autoplayDuration
  }

  /**
   * Autoplay change direction ('next', 'prev')
   */
  export let autoplayDirection = NEXT
  $: {
    data.autoplayDirection = autoplayDirection
  }

  /**
   * Pause autoplay on focus
   */
  export let pauseOnFocus = false
  $: {
    data.pauseOnFocus = pauseOnFocus
  }

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
  $: {
    data.particlesToShowInit = particlesToShow
  }

  /**
   * Number of particles to scroll
   */
  export let particlesToScroll = 1
  $: {
    data.particlesToScrollInit = particlesToScroll
  }

  export async function goTo(pageIndex, options) {
    const animated = get(options, 'animated', true)
    if (typeof pageIndex !== 'number') {
      throw new Error('pageIndex should be a number')
    }
    await methods.showPage(pageIndex, { animated })
  }

  export async function goToPrev(options) {
    const animated = get(options, 'animated', true)
    await methods.showPrevPage({ animated })
  }

  export async function goToNext(options) {
    const animated = get(options, 'animated', true)
    await methods.showNextPage({ animated })
  }

  let pageWindowWidth = 0
  let pageWindowElement
  let particlesContainer

  const pageWindowElementResizeObserver = createResizeObserver(({
    width,
  }) => {
    pageWindowWidth = width
    data.particleWidth = pageWindowWidth / data.particlesToShow

    applyParticleSizes({
      particlesContainerChildren: particlesContainer.children,
      particleWidth: data.particleWidth,
    })
    methods.offsetPage({ animated: false })
  })

  function addClones() {
    const {
      clonesToAppend,
      clonesToPrepend,
    } = getClones({
      clonesCountHead: data.clonesCountHead,
      clonesCountTail: data.clonesCountTail,
      particlesContainerChildren: particlesContainer.children,
    })
    applyClones({
      particlesContainer,
      clonesToAppend,
      clonesToPrepend,
    })
  }

  onMount(() => {
    (async () => {
      await tick()
      if (particlesContainer && pageWindowElement) {
        data.particlesCountWithoutClones = particlesContainer.children.length

        await tick()
        data.infinite && addClones()

        // call after adding clones
        data.particlesCount = particlesContainer.children.length

        methods.showPage(initialPageIndex, { animated: false })

        pageWindowElementResizeObserver.observe(pageWindowElement);
      }
    })()
  })

  onDestroy(() => {
    pageWindowElementResizeObserver.disconnect()
    progressManager.reset()
  })

  async function handlePageChange(pageIndex) {
    await methods.showPage(pageIndex, { animated: true })
  }

  // gestures
  function handleSwipeStart() {
    if (!swiping) return
    data.durationMs = 0
  }
  async function handleSwipeThresholdReached(event) {
    if (!swiping) return
    await switcher({
      [NEXT]: methods.showNextPage,
      [PREV]: methods.showPrevPage
    })(event.detail.direction)
  }
  function handleSwipeMove(event) {
    if (!swiping) return
    data.offset += event.detail.dx
  }
  function handleSwipeEnd() {
    if (!swiping) return
    methods.showParticle(data.currentParticleIndex)
  }
  async function handleSwipeFailed() {
    if (!swiping) return
    await methods.offsetPage({ animated: true })
  }

  function handleHovered(event) {
    data.focused = event.detail.value
  }
  function handleTapped() {
    methods.toggleFocused()
  }

  function showPrevPage() {
    methods.showPrevPage()
  }
</script>

<div class="sc-carousel__carousel-container">
  <div class="sc-carousel__content-container">
    {#if arrows}
      <slot name="prev" showPrevPage={methods.showPrevPage}>
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
          transition-duration: {durationMs}ms;
          transition-timing-function: {timingFunction};
        "
        bind:this={particlesContainer}
      >
        <slot {loaded} {currentPageIndex}></slot>
      </div>
      {#if autoplayProgressVisible}
        <div class="sc-carousel-progress__container">
          <Progress value={progressValue} />
        </div>
      {/if}
    </div>
    {#if arrows}
      <slot name="next" showNextPage={methods.showNextPage}>
        <div class="sc-carousel__arrow-container">
          <Arrow
            direction="next"
            disabled={!infinite && currentPageIndex === pagesCount - 1}
            on:click={methods.showNextPage}
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
  :global(.sc-carousel-button) {
    all: unset;
    cursor: pointer;
  }
  :global(.sc-carousel-button:focus) {
    outline: 5px auto;
  }
</style>
