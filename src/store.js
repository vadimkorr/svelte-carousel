import {
  writable,
} from 'svelte/store';
import {
  getNextPageIndexFn,
  getPrevPageIndexFn,
  getPageIndex,
} from './utils/page'

const initState = {
  currentPageIndex: 0,
}

function createStore() {
  const { subscribe, set, update } = writable(initState);

  function init(initialPageIndex) {
    set({
      ...initState,
      currentPageIndex: initialPageIndex,
    })
  }

  function moveToPage({
    pageIndex,
    pagesCount,
  }) {
    update(store => {
      return {
        ...store,
        currentPageIndex: getPageIndex({
          pageIndex,
          pagesCount,
        }),
      }
    })
  }

  function next({
    infinite,
    pagesCount,
    pagesToScroll,
  }) {
    update(store => {
      const newCurrentPageIndex = getNextPageIndexFn(infinite)({
        currentPageIndex: store.currentPageIndex,
        pagesCount,
        pagesToScroll,
      })
      return {
        ...store,
        currentPageIndex: newCurrentPageIndex,
      }
    })
  }

  function prev({
    infinite,
    pagesCount,
    pagesToScroll,
  }) {
    update(store => {
      const newCurrentPageIndex = getPrevPageIndexFn(infinite)({
        currentPageIndex: store.currentPageIndex,
        pagesCount,
        pagesToScroll,
      })
      return {
        ...store,
        currentPageIndex: newCurrentPageIndex,
      }
    })
  }

  return {
    subscribe,
    next,
    prev,
    init,
    moveToPage,
  };
}

export { createStore };
