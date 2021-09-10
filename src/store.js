import {
  writable,
} from 'svelte/store';
import {
  getNextParticleIndexFn,
  getPrevParticleIndexFn,
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
    particlesCount,
    particlesToScroll,
    particlesToShow,
    clonesCountTail,
  }) {
    update(store => {
      const newCurrentParticleIndex = getNextParticleIndexFn(infinite)({
        currentParticleIndex: store.currentParticleIndex,
        particlesCount,
        particlesToScroll,
        particlesToShow,
        clonesCountTail,
      })
      return {
        ...store,
        currentParticleIndex: newCurrentParticleIndex,
      }
    })
  }

  function prev({
    infinite,
    particlesCount,
    particlesToScroll,
  }) {
    update(store => {
      const newCurrentParticleIndex = getPrevParticleIndexFn(infinite)({
        currentParticleIndex: store.currentParticleIndex,
        particlesCount,
        particlesToScroll,
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
