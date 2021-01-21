<script>
  // TODO: rename image carousel to just carousel
  // TODO: seems CarouselChild component can be removed
  import { onMount } from 'svelte'
  import { store } from './store'

  console.log('init')

  /**
   * Enable Next/Prev arrows
   */
  export let arrows = true;

  /**
   * Infinite looping
   */
  export let infinite	= true;


  export let perPage = 3;

  
  let contentContainerElement
  let innerContentContainerElement
  let children
  let w = 0
  onMount(() => {
    store.reset() // to init after hot reload
    console.log('mounted!')
    store.setCurrentItemIndex(0) // to init index after hot reload, check one more time
    children = innerContentContainerElement.children
    console.log('children', children.length)
    w = contentContainerElement.clientWidth

    let pageIndex = 0;
    let pagesCount = Math.ceil(children.length/perPage)
    // TODO: add event listener on resize
    const perPageTail = children.length - perPage * (pagesCount - 1)
    console.log('perPageTail', perPageTail)
    for (let i=0; i<children.length; i++) {
      pageIndex = Math.floor(i/perPage)
      // handle tail page where might be less than perPage slides
      const childWidth = pageIndex === pagesCount - 1 && pagesCount !== 1
        ? Math.round(w/perPageTail) // last page 
        : Math.round(w/perPage) // full page children.length - i >= perPage ? Math.round(w/perPage) : Math.round(w/perPageTail)
      console.log('childWidth', pageIndex === pagesCount - 1, Math.round(w/perPageTail), Math.round(w/perPage))
      children[i].style.minWidth = `${childWidth}px`
      children[i].style.maxWidth = `${childWidth}px`
      console.log('children', w)
      store.setItem()
    }
  })

  let offset
  function handlePrevClick() {
    store.prev({ infinite, perPage })
    offset = -$store.currentItemIndex * w // children[$store.currentItemIndex].clientWidth
  }
  function handleNextClick() {
    store.next({ infinite, perPage })
    // console.log('children.length', children.length, $store.currentItemIndex)
    offset = -$store.currentItemIndex * w // children[$store.currentItemIndex].clientWidth
    // console.log('offset', offset, children[$store.currentItemIndex].clientWidth)
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