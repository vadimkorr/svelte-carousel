import { writable } from 'svelte/store';
import { getNextItemIndexFn, getPrevItemIndexFn } from './utils/item-index'

// TODO: try to split writable store items
// or try to use immer

const initState = {
  currentItemIndex: null,
}

function createStore() {
  const { subscribe, set, update } = writable(initState);

  function reset() {
    set(initState)
  }

  function setCurrentItemIndex(index) {
    update(store => ({
      ...store,
      currentItemIndex: index,
    }))
  }

  function moveToPage({ pageIndex, pagesCount }) {
    update(store => {
      return {
        ...store,
        currentItemIndex: pageIndex < 0 ? 0 : Math.min(pageIndex, pagesCount - 1),
      }
    })
  }

  function next({ infinite, pagesCount }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex
      const newCurrentItemIndex = getNextItemIndexFn(infinite)(currentItemIndex, pagesCount)
      return {
        ...store,
        currentItemIndex: newCurrentItemIndex,
      }
    })
  }

  function prev({ infinite, pagesCount }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex
      const newCurrentItemIndex = getPrevItemIndexFn(infinite)(currentItemIndex, pagesCount)
      return {
        ...store,
        currentItemIndex: newCurrentItemIndex,
      }
    })
  }

  return {
    subscribe,
    next,
    prev,
    setCurrentItemIndex,
    reset,
    moveToPage,
  };
}

export const store = createStore();