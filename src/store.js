import {
  writable,
} from 'svelte/store';
import {
  getParticleIndexByPageIndex,
} from './utils/page'
import {
  getValueInRange,
} from './utils/math'

const initState = {
  currentParticleIndex: 0,
}

function createStore() {
  const { subscribe, set, update } = writable(initState);

  function init(initialParticleIndex) {
    set({
      ...initState,
      currentParticleIndex: initialParticleIndex,
    })
  }

  function moveToParticle({
    particleIndex,
    particlesCount,
  }) {
    update(store => {
      return {
        ...store,
        currentParticleIndex: getValueInRange(0, particleIndex, particlesCount - 1),
      }
    })
  }

  function next({
    infinite,
    currentPageIndex,
    particlesCount,
    particlesToScroll,
    particlesToShow,
    clonesCountHead,
    clonesCountTail,
  }) {
    update(store => {
      const newCurrentParticleIndex = getParticleIndexByPageIndex({
        infinite,
        pageIndex: currentPageIndex + 1,
        clonesCountHead,
        clonesCountTail,
        particlesToScroll,
        particlesCount,
        particlesToShow,
      })
      return {
        ...store,
        currentParticleIndex: newCurrentParticleIndex,
      }
    })
  }

  function prev({
    infinite,
    currentPageIndex,
    clonesCountHead,
    clonesCountTail,
    particlesToScroll,
    particlesCount,
    particlesToShow,
  }) {
    update(store => {
      const newCurrentParticleIndex = getParticleIndexByPageIndex({
        infinite,
        pageIndex: currentPageIndex - 1,
        clonesCountHead,
        clonesCountTail,
        particlesToScroll,
        particlesCount,
        particlesToShow,
      })
      return {
        ...store,
        currentParticleIndex: newCurrentParticleIndex,
      }
    })
  }

  return {
    subscribe,
    next,
    prev,
    init,
    moveToParticle,
  };
}

export { createStore };
