import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid'
import { getNextItemIndexFn, getPrevItemIndexFn } from './utils/item-index'

// TODO: try to split writable store items
// or try to use immer

const initState = {
  items: [],
  // currentItemId: null,
  currentItemIndex: null,
  action: 'next'
}

function createStore() {
  const { subscribe, set, update } = writable(initState);

  function reset() {
    set(initState)
  }

  function setItem(id = uuid()) {
    update(store => ({
      ...store,
      // currentItemId: id, // TODO: seems is not used at all, can be removed
      items: [
        ...store.items,
        id
      ]
    }))
  }

  function setCurrentItemIndex(index) {
    update(store => ({
      ...store,
      currentItemIndex: index,
    }))
  }

  function removeItem(id) {
    update(store => ({
      ...store,
      items: store.items.filter(item => item !== id)
    }))
  }

  function next({ infinite, perPage }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex // store.items.findIndex(item => item === store.currentItemId)
      // console.log('next old currentItemIndex', currentItemIndex)
      const newCurrentItemIndex = getNextItemIndexFn(infinite)(currentItemIndex, Math.ceil(store.items.length / perPage))
      // console.log('newCurrentItemIndex', newCurrentItemIndex)
      return {
        ...store,
        // currentItemId: store.items[newCurrentItemIndex],
        currentItemIndex: newCurrentItemIndex,
        action: 'next'
      }
    })
  }

  function prev({ infinite, perPage }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex // store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = getPrevItemIndexFn(infinite)(currentItemIndex, Math.ceil(store.items.length / perPage))
      return {
        ...store,
        // currentItemId: store.items[newCurrentItemIndex],
        currentItemIndex: newCurrentItemIndex,
        action: 'prev'
      }
    })
  }

  return {
    subscribe,
    setItem,
    removeItem,
    next,
    prev,
    setCurrentItemIndex,
    reset
  };
}

export const store = createStore();