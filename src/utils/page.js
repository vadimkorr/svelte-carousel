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

export function getCurrentPageIndex({
  currentParticleIndex,
  particlesCount,
  headClonesCount,
  infinite,
  particlesToScroll,
}) {
  if (infinite) {
    if (currentParticleIndex === particlesCount - headClonesCount) return 0
    if (currentParticleIndex === 0) return particlesCount - headClonesCount
    return Math.floor((currentParticleIndex - headClonesCount) / particlesToScroll)
  }
  return Math.ceil(currentParticleIndex / particlesToScroll)
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

export function getPagesCountByParticlesCount({
  infinite,
  particlesCountWithoutClones,
  particlesToScroll,
}) {
  return infinite
    ? Math.ceil(particlesCountWithoutClones / particlesToScroll)
    : Math.round(particlesCountWithoutClones / particlesToScroll)
}

export function getParticleIndexByPageIndexInfinite({
  pageIndex,
  clonesCountHead,
  clonesCountTail,
  particlesToScroll,
  particlesCount,
}) {
  return getValueInRange(
    clonesCountHead,
    Math.min(clonesCountHead + pageIndex * particlesToScroll, particlesCount - clonesCountTail),
    particlesCount - 1
  )
}

export function getParticleIndexByPageIndexLimited({
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
    ? getParticleIndexByPageIndexInfinite({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
    })
    : getParticleIndexByPageIndexLimited({
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
