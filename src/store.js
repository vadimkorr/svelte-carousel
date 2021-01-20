import { writable } from 'svelte/store';


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

  function next() {
    // TODO: move to utils functions and cover eoth tests
    update(store => {
      const currentItemIndex = store.items.findIndex(item => item === store.currentItemId)
      // TODO: infinite
      // const newCurrentItemIndex = currentItemIndex + 1 > store.items.length - 1 ? 0 : currentItemIndex + 1
      const newCurrentItemIndex = Math.min(currentItemIndex + 1, store.items.length - 1)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex]
      }
    })
  }

  function prev() {
    update(store => {
      const currentItemIndex = store.items.findIndex(item => item === store.currentItemId)
      const newCurrentItemIndex = Math.max(0, currentItemIndex - 1)
      return {
        ...store,
        currentItemId: store.items[newCurrentItemIndex]
      }
    })
  }

  return {
    subscribe,
    setItem,
    next,
    prev
  };
}

export const store = createStore();