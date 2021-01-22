import { writable } from 'svelte/store';
import { getNextPageIndexFn, getPrevPageIndexFn } from './utils/page-index'

const initState = {
  currentPageIndex: 0,
}

function createStore() {
  const { subscribe, set, update } = writable(initState);

  function init(initialPageIndex) {
    set({
      ...initState,
      currentPageIndex: initialPageIndex
    })
  }

  function setCurrentPageIndex(index) {
    update(store => ({
      ...store,
      currentPageIndex: index,
    }))
  }

  function moveToPage({ pageIndex, pagesCount }) {
    update(store => {
      return {
        ...store,
        currentPageIndex: pageIndex < 0 ? 0 : Math.min(pageIndex, pagesCount - 1),
      }
    })
  }

  function next({ infinite, pagesCount }) {
    update(store => {
      const newCurrentPageIndex = getNextPageIndexFn(infinite)(store.currentPageIndex, pagesCount)
      return {
        ...store,
        currentPageIndex: newCurrentPageIndex,
      }
    })
  }

  function prev({ infinite, pagesCount }) {
    update(store => {
      const newCurrentPageIndex = getPrevPageIndexFn(infinite)(store.currentPageIndex, pagesCount)
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
    setCurrentPageIndex,
    init,
    moveToPage,
  };
}

export const store = createStore();
