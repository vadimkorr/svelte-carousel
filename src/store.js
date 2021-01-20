import { writable } from 'svelte/store';
import { getNextItemIndexFn, getPrevItemIndexFn } from './utils/item-index'

function createStore() {
  const { subscribe, set, update } = writable({
    items: [],
    currentItemId: null
  });

  function setItem(id) {
    update(store => ({
      ...store,
      currentItemId: id,
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
      const currentItemIndex = store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = getNextItemIndexFn(infinite)(currentItemIndex, store.items)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex]
      }
    })
  }

  function prev({ infinite }) {
    update(store => {
      const currentItemIndex = store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = getPrevItemIndexFn(infinite)(currentItemIndex, store.items)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex]
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