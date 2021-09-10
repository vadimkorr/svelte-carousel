import {
  getValueInRange,
} from './math'

export function getNextParticleIndexLimited({
  currentParticleIndex,
  particlesCount,
  particlesToScroll,
}) {
  if (particlesCount < 1) throw new Error('particlesCount must be at least 1')
  return Math.max(
    currentParticleIndex + Math.min(particlesCount - (currentParticleIndex + 1) - particlesToScroll, particlesToScroll),
    0
  )
}

export function getNextParticleIndexInfinte({
  currentParticleIndex,
  particlesCount,
  particlesToScroll,
  clonesCountTail,
}) {
  if (particlesCount < 1) throw new Error('particlesCount must be at least 1')
  const newCurrentParticleIndex = Math.max(currentParticleIndex, 0) + Math.min(particlesCount - clonesCountTail - currentParticleIndex, particlesToScroll)
  return newCurrentParticleIndex > particlesCount - 1 ? 0 : Math.max(newCurrentParticleIndex, 0)
}

export function getNextParticleIndexFn(infinite) {
  return infinite ? getNextParticleIndexInfinte : getNextParticleIndexLimited
}

export function getPrevParticleIndexLimited({
  currentParticleIndex,
  particlesCount,
  particlesToScroll,
}) {
  if (particlesCount < 1) throw new Error('particlesCount must be at least 1')
  return getValueInRange(
    0,
    currentParticleIndex - Math.min(currentParticleIndex, particlesToScroll),
    particlesCount - 1
  )
}

export function getPrevParticleIndexInfinte({
  currentParticleIndex,
  particlesCount,
  particlesToScroll,
}) {
  if (particlesCount < 1) throw new Error('particlesCount must be at least 1')
  const newCurrentParticleIndex = Math.min(currentParticleIndex, particlesCount - 1) - Math.min(currentParticleIndex, particlesToScroll)
  return newCurrentParticleIndex >= 0 ? Math.min(newCurrentParticleIndex, particlesCount - 1) : particlesCount - 1
}

export function getPrevParticleIndexFn(infinite) {
  return infinite ? getPrevParticleIndexInfinte : getPrevParticleIndexLimited
}

export function getSizes({
  pageWindowElement,
  particlesContainerChildren,
  particlesToShow,
}) {
  const pageWindowWidth = pageWindowElement.clientWidth
  const particleWidth = pageWindowWidth / particlesToShow
  const particlesCount = particlesContainerChildren.length

  return {
    pageWindowWidth,
    particleWidth,
    particlesCount,
  }
}

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
  pagesCountWithoutClones, // TODO: rename 
}) {
  const overlap = particlesToScroll - particlesToShow
  let particlesCount = particlesToShow

  while(true) {
    const diff = pagesCountWithoutClones - particlesCount - overlap
    if (diff < particlesToShow) {
      return diff
    }
    particlesCount += particlesToShow + overlap
  }
}

export function getPagesCount({
  infinite,
  pagesCountWithoutClones,
  particlesToScroll,
}) {
  return infinite
    ? Math.ceil(pagesCountWithoutClones / particlesToScroll)
    : Math.round(pagesCountWithoutClones / particlesToScroll)
}

export function getParticleIndexByPageIndex({
  infinite,
  pageIndex,
  clonesCountHead,
  particlesToScroll,
  particlesCount,
  particlesToShow,
}) {
  return infinite
    ? clonesCountHead + pageIndex * particlesToScroll
    : Math.min(pageIndex * particlesToScroll, particlesCount - particlesToShow)
}
