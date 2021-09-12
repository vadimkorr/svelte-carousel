import {
  getValueInRange,
} from './math'

export function applyParticleSizes({
  particlesContainerChildren,
  particleWidth,
}) {
  for (let particleIndex=0; particleIndex<particlesContainerChildren.length; particleIndex++) {
    particlesContainerChildren[particleIndex].style.minWidth = `${particleWidth}px`
    particlesContainerChildren[particleIndex].style.maxWidth = `${particleWidth}px`
  }
}

// getCurrentPageIndexByCurrentParticleIndex

export function _getCurrentPageIndexByCurrentParticleIndexInfinite({
  currentParticleIndex,
  particlesCount,
  clonesCountHead,
  clonesCountTotal,
  particlesToScroll,
}) {
  if (currentParticleIndex === particlesCount - clonesCountHead) return 0
  if (currentParticleIndex === 0) return _getPagesCountByParticlesCountInfinite({
    particlesCountWithoutClones: particlesCount - clonesCountTotal,
    particlesToScroll,
  }) - 1
  return Math.floor((currentParticleIndex - clonesCountHead) / particlesToScroll)
}

export function _getCurrentPageIndexByCurrentParticleIndexLimited({
  currentParticleIndex,
  particlesToScroll,
}) {
  return Math.ceil(currentParticleIndex / particlesToScroll)
}

export function getCurrentPageIndexByCurrentParticleIndex({
  currentParticleIndex,
  particlesCount,
  clonesCountHead,
  clonesCountTotal,
  infinite,
  particlesToScroll,
}) {
  return infinite
    ? _getCurrentPageIndexByCurrentParticleIndexInfinite({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      particlesToScroll,
    })
    : _getCurrentPageIndexByCurrentParticleIndexLimited({
      currentParticleIndex,
      particlesToScroll,
    })
}

// TODO: think about case if particlesCount < particlesToShow and particlesCount < particlesToScroll
export function getPartialPageSize({
  particlesToScroll,
  particlesToShow,
  particlesCountWithoutClones, 
}) {
  const overlap = particlesToScroll - particlesToShow
  let particlesCount = particlesToShow

  while(true) {
    const diff = particlesCountWithoutClones - particlesCount - overlap
    if (diff < particlesToShow) {
      return diff
    }
    particlesCount += particlesToShow + overlap
  }
}

// getPagesCountByParticlesCount

export function _getPagesCountByParticlesCountInfinite({
  particlesCountWithoutClones,
  particlesToScroll,
}) {
  return Math.ceil(particlesCountWithoutClones / particlesToScroll)
}

export function _getPagesCountByParticlesCountLimited({
  particlesCountWithoutClones,
  particlesToScroll,
}) {
  return Math.round(particlesCountWithoutClones / particlesToScroll)
}

export function getPagesCountByParticlesCount({
  infinite,
  particlesCountWithoutClones,
  particlesToScroll,
}) {
  return infinite
    ? _getPagesCountByParticlesCountInfinite({
      particlesCountWithoutClones,
      particlesToScroll,
    })
    : _getPagesCountByParticlesCountLimited({
      particlesCountWithoutClones,
      particlesToScroll,
    })
}

// getParticleIndexByPageIndex

export function _getParticleIndexByPageIndexInfinite({
  pageIndex,
  clonesCountHead,
  clonesCountTail,
  particlesToScroll,
  particlesCount,
}) {
  return getValueInRange(
    0,
    Math.min(clonesCountHead + pageIndex * particlesToScroll, particlesCount - clonesCountTail),
    particlesCount - 1
  )
}

export function _getParticleIndexByPageIndexLimited({
  pageIndex,
  particlesToScroll,
  particlesCount,
  particlesToShow,
}) {
  return getValueInRange(
    0,
    Math.min(pageIndex * particlesToScroll, particlesCount - particlesToShow),
    particlesCount - 1
  ) 
}

export function getParticleIndexByPageIndex({
  infinite,
  pageIndex,
  clonesCountHead,
  clonesCountTail,
  particlesToScroll,
  particlesCount,
  particlesToShow,
}) {
  return infinite
    ? _getParticleIndexByPageIndexInfinite({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
    })
    : _getParticleIndexByPageIndexLimited({
      pageIndex,
      particlesToScroll,
      particlesCount,
      particlesToShow,
    })
}

export function createResizeObserver(onResize) {
  return new ResizeObserver(entries => {
    onResize({
      width: entries[0].contentRect.width,
    })
  });
}
