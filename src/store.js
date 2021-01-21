import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid'
import { getNextItemIndexFn, getPrevItemIndexFn } from './utils/item-index'


function createStore() {
  const { subscribe, set, update } = writable({
    items: [],
    currentItemId: null,
    currentItemIndex: null,
    action: 'next'
  });

  function setItem(id = uuid()) {
    update(store => ({
      ...store,
      currentItemId: id,
      currentItemIndex: 0, // store.items.length - 1, TODO: use as a param
      items: [
        ...store.items,
        id
      ]
    }))
  }

  function removeItem(id) {
    update(store => ({
      ...store,
      items: store.items.filter(item => item !== id)
    }))
  }

  function next({ infinite }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex // store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = getNextItemIndexFn(infinite)(currentItemIndex, store.items)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex],
        currentItemIndex: newCurrentItemIndex,
        action: 'next'
      }
    })
  }

  function prev({ infinite }) {
    update(store => {
      const currentItemIndex = store.currentItemIndex // store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = getPrevItemIndexFn(infinite)(currentItemIndex, store.items)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex],
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
    prev
  };
}

export const store = createStore();